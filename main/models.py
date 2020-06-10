from datetime import datetime
from email.utils import make_msgid

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import models
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.dateformat import format
from django.utils.html import strip_tags
from django_mailbox.models import Mailbox
from django_mailbox.models import Message

from main import choices


class BackupableModel(models.Model):
    restoring = False

    def __init__(self, *args, **kwargs):
        restoring = kwargs.pop('restoring', False)
        self.restoring = restoring
        super().__init__(*args, **kwargs)

    class Meta:
        abstract = True


# -------------------------------------------------------------------------------------------------------------------- #


class Cartridge(BackupableModel):
    manufacturer = models.CharField(max_length=30, choices=choices.MANUFACTURER_CHOICES, default="HP",
                                    verbose_name="Производитель")
    name = models.CharField(max_length=30, unique=True, primary_key=True, verbose_name="Название картриджа",
                            help_text="Наименование картриджа должно быть уникальным",
                            db_column="cartridge_name")
    count = models.PositiveIntegerField(verbose_name="Количество")

    def __str__(self):
        return f'{self.manufacturer} {self.name}'

    class Meta:
        ordering = ['manufacturer', 'name']
        # ordering = ['name']


class Supply(BackupableModel):
    out = models.BooleanField(choices=choices.SUPPLY_TYPE_BOOLEAN, default=True, verbose_name="Тип передвижения")
    cartridge = models.ForeignKey(Cartridge, related_name="supplies", on_delete=models.CASCADE,
                                  verbose_name="Тип картриджа")
    date = models.DateTimeField(default=timezone.now, blank=True)
    edited_at = models.DateTimeField(auto_now=True)
    count = models.PositiveIntegerField(verbose_name="Количество")
    comment = models.TextField(max_length=200, verbose_name="Комментарий", blank=True)

    def __str__(self):
        return f"{format(self.date, settings.DATETIME_FORMAT)} {self.get_out_display()} {self.cartridge}"

    class Meta:
        ordering = ['-date']

    def update_cartridge_count(self, value):
        """
        Makes necessary changes to the count of cartridges.
        :param value: Difference on count in supply compared to previous count.
        :type value: int
        """
        print(f"Updating cartridge count: {self.cartridge} {value=} ; {self.out=} ; {self.cartridge.count=}")
        if value != 0 and value is not None:
            if self.out:
                self.cartridge.count -= value
            else:
                self.cartridge.count += value

            print(f"{self.cartridge} new count is {self.cartridge.count}")
            self.cartridge.save()

    def save(self, *args, **kwargs):
        # If this is restoring from json, don't do any corrective actions, just save
        if not self.restoring:
            if self.pk is None or not Supply.objects.filter(pk=self.pk).exists():
                # If supply is new
                self.update_cartridge_count(self.count)
            else:
                # If supply exists and got updated
                prev_supply = Supply.objects.get(pk=self.pk)

                if prev_supply.out is not self.out:
                    # If direction is changed, compensate that
                    prev_supply.count -= prev_supply.count

                count_difference = self.count - prev_supply.count
                self.update_cartridge_count(count_difference)
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self.update_cartridge_count(self.count * -1)
        return super().delete(using, keep_parents)


class Order(BackupableModel):
    status = models.CharField(max_length=10, choices=choices.ORDER_STATUS, default="creating", verbose_name="Статус")
    date = models.DateTimeField(default=timezone.now, blank=True, verbose_name="Дата создания")
    destination = models.CharField(max_length=100, blank=True, default="2 подъезд от КПП (АБЧ 2), Этаж 2, кабинет 14")
    edited_at = models.DateTimeField(auto_now=True, verbose_name="Дата редактирования")
    date_finished = models.DateTimeField(blank=True, null=True, verbose_name="Дата выполнения")
    number = models.PositiveIntegerField(default=0, blank=True, verbose_name="Номер заявки")
    finished = models.BooleanField(default=False, verbose_name="Выполнен")
    cartridge = models.ForeignKey(Cartridge, related_name="orders", on_delete=models.CASCADE, verbose_name="Картридж")
    supply = models.OneToOneField(Supply, related_name="order", on_delete=models.CASCADE, blank=True, null=True,
                                  verbose_name="Перемещение")
    count = models.PositiveIntegerField(verbose_name="Количество")
    email = models.OneToOneField(Message, on_delete=models.SET_NULL, related_name="order", null=True, blank=True)

    @property
    def html_message(self):
        return render_to_string('OutlookOrder.html', {'order': self})

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return (
            f"{format(self.date, settings.DATETIME_FORMAT)} {self.get_status_display()} {self.cartridge} {self.count}"
        )

    def get_html_message(self):
        return render_to_string('OutlookOrder.html', {'order': self})

    def send_to_manager(self, address_list):
        """
        Makes the email message from html template, sends it to specified addresses, records the message to
        django-mailbox.
        :param address_list: list of email addresses as strings.
        :type address_list: list
        """
        html_message = self.html_message
        plain_message = strip_tags(html_message)
        email = EmailMultiAlternatives(
            f'Картриджи {self.cartridge}, ООО "Деловые Линии"',
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            address_list,
        )
        email.attach_alternative(html_message, "text/html")
        email.encoding = "UTF-8"
        email.extra_headers['Message-ID'] = make_msgid()
        email.send()
        if self.status == "creating":
            self.status = "pending"

        mailbox = Mailbox.objects.get(name="oks-dellin")
        self.email = mailbox.record_outgoing_message(email.message())
        self.save()

    def finish(self):
        """Processes order to finished state."""
        self.finished = True
        self.status = "finished"
        self.date_finished = datetime.now()
        self.supply = Supply.objects.create(out=False, cartridge=self.cartridge, count=self.count,
                                            comment=f"По заказу №{self.pk} от {format(self.date, 'd E Y')}")

    def roll_back(self):
        """Processes order from finished state to work state."""
        self.finished = False
        self.status = "work"
        self.date_finished = None
        if self.supply:
            self.supply.delete()
            self.supply = None

    def save(self, *args, **kwargs):
        # Make corrections only if it's not the initial save and object is not being restored
        if self.pk and not self.restoring:
            prev_values = Order.objects.get(pk=self.pk)
            if self.finished is not prev_values.finished:
                if self.finished and not prev_values.finished:
                    self.finish()
                elif prev_values.finished and not self.finished:
                    self.roll_back()
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self.roll_back()
        return super().delete(using, keep_parents)
