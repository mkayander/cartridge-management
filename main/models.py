from datetime import datetime

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.dateformat import format

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
    date = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    edited_at = models.DateTimeField(auto_now=True, verbose_name="Дата редактирования")
    date_finished = models.DateTimeField(blank=True, null=True, verbose_name="Дата выполнения")
    number = models.PositiveIntegerField(blank=True, null=True, verbose_name="Номер заявки")
    finished = models.BooleanField(default=False, verbose_name="Выполнен")
    cartridge = models.ForeignKey(Cartridge, related_name="orders", on_delete=models.CASCADE, verbose_name="Картридж")
    supply = models.ForeignKey(Supply, related_name="order", on_delete=models.CASCADE, blank=True, null=True,
                               verbose_name="Перемещение")
    count = models.PositiveIntegerField(verbose_name="Количество")

    def finish(self):
        self.finished = True
        self.status = "finished"
        self.date_finished = datetime.now()

    def __str__(self):
        return f"{format(self.date, settings.DATETIME_FORMAT)} {self.get_status_display()} {self.cartridge} {self.count}"

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
