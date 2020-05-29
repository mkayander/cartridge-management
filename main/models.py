from datetime import datetime

from django.conf import settings
from django.core import mail
from django.db import models
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.dateformat import format
from django.utils.html import strip_tags

from main import choices


class BackupableModel(models.Model):
    restoring = False

    class Meta:
        abstract = True


# -------------------------------------------------------------------------------------------------------------------- #


class Cartridge(models.Model):
    manufacturer = models.CharField(max_length=30, choices=choices.MANUFACTURER_CHOICES, default="HP",
                                    verbose_name="Производитель")
    name = models.CharField(max_length=30, unique=True, primary_key=True, verbose_name="Название картриджа",
                            help_text="Наименование картриджа должно быть уникальным",
                            db_column="cartridge_name")
    count = models.PositiveIntegerField(verbose_name="Количество")

    def __init__(self, *args, **kwargs):
        restoring = kwargs.pop('restoring', False)
        self.restoring = restoring
        super().__init__(*args, **kwargs)

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

    def __init__(self, *args, **kwargs):
        restoring = kwargs.pop('restoring', False)
        self.restoring = restoring
        super().__init__(*args, **kwargs)

    class Meta:
        ordering = ['-date']

    def update_cartridge_count(self, value):
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


class Order(models.Model):
    status = models.CharField(max_length=10, choices=choices.ORDER_STATUS, default="work", verbose_name="Статус")
    date = models.DateTimeField(default=timezone.now, blank=True, verbose_name="Дата создания")
    destination = models.CharField(max_length=100, blank=True, default="2 подъезд от КПП (АБЧ 2), Этаж 2, кабинет 14")
    edited_at = models.DateTimeField(auto_now=True, verbose_name="Дата редактирования")
    date_finished = models.DateTimeField(blank=True, null=True, verbose_name="Дата выполнения")
    number = models.PositiveIntegerField(default=0, blank=True, verbose_name="Номер заявки")
    finished = models.BooleanField(default=False, verbose_name="Выполнен")
    cartridge = models.ForeignKey(Cartridge, related_name="orders", on_delete=models.CASCADE, verbose_name="Картридж")
    supply = models.ForeignKey(Supply, related_name="order", on_delete=models.CASCADE, blank=True, null=True,
                               verbose_name="Перемещение")
    count = models.PositiveIntegerField(verbose_name="Количество")

    def __init__(self, *args, **kwargs):
        restoring = kwargs.pop('restoring', False)
        self.restoring = restoring
        super().__init__(*args, **kwargs)

    def make_message(self):
        return ('ООО «Деловые Линии»\n'
                'PNK Парк Валищево +7 (916) 5654206 142143, Московская обл, Подольск г, Валищево д, промышленного парка Валищево тер, дом № 2, стр 1\n'
                f'Прошу предоставить картриджи {self.cartridge} в количестве {self.count} штук\n'
                f'{self.destination}\n'
                'Системный администратор\n'
                'Каяндер Максим Эдуардович\n'
                '89854199347')

    def send(self):
        html_message = render_to_string('OrderMessage.html', {'order': self})
        print(html_message)
        plain_message = strip_tags(html_message)
        mail.send_mail(
            "Предоставление картриджей ",
            plain_message,
            from_email="inqer.net@gmail.com",
            recipient_list=["maxim.kayander1@gmail.com"],
            html_message=html_message
        )

    def finish(self):
        self.finished = True
        self.status = "finished"
        self.date_finished = datetime.now()

    def __str__(self):
        return f"{format(self.date, settings.DATETIME_FORMAT)} {self.get_status_display()} {self.cartridge} {self.count}"

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
