from datetime import datetime

from django.db import models

from main import choices


class Cartridge(models.Model):
    manufacturer = models.CharField(max_length=30, choices=choices.MANUFACTURER_CHOICES, default="HP",
                                    verbose_name="Производитель")
    name = models.CharField(max_length=30, unique=True, primary_key=True, verbose_name="Название картриджа",
                            help_text="Наименование картриджа должно быть уникальным",
                            db_column="cartridge_name")
    count = models.PositiveIntegerField(verbose_name="Количество")

    def __str__(self):
        return f'{self.manufacturer***REMOVED*** {self.name***REMOVED***'


class Supply(models.Model):
    out = models.BooleanField(choices=choices.SUPPLY_TYPE_BOOLEAN, default=True, verbose_name="Тип передвижения")
    cartridge = models.ForeignKey(Cartridge, related_name="supplies", on_delete=models.CASCADE,
                                  verbose_name="Тип картриджа")
    date = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    count = models.PositiveIntegerField(verbose_name="Количество")
    comment = models.TextField(max_length=200, verbose_name="Комментарий", blank=True)

    def __str__(self):
        return str(self.date)

    def update_cartridge_count(self, value):
        print(f"Updating cartridge count: {self.cartridge***REMOVED*** {value=***REMOVED*** ; {self.out=***REMOVED*** ; {self.cartridge.count=***REMOVED***")
        if value != 0 and value is not None:
            if self.out:
                self.cartridge.count -= value
            else:
                self.cartridge.count += value

            print(f"{self.cartridge***REMOVED*** new count is {self.cartridge.count***REMOVED***")
            self.cartridge.save()

    def save(self, *args, **kwargs):
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
    date = models.DateTimeField(auto_now=True, verbose_name="Дата создания")
    date_finished = models.DateTimeField(blank=True, null=True, verbose_name="Дата выполнения")
    number = models.PositiveIntegerField(blank=True, null=True, verbose_name="Номер заявки")
    finished = models.BooleanField(default=False, verbose_name="Выполнен")
    cartridge = models.ForeignKey(Cartridge, related_name="orders", on_delete=models.CASCADE, verbose_name="Картридж")
    supply = models.ForeignKey(Supply, related_name="order", on_delete=models.CASCADE, blank=True, null=True,
                               verbose_name="Перемещение")
    count = models.PositiveIntegerField(verbose_name="Количество")

    def finish(self):
        self.finished = True
        self.date_finished = datetime.now()

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
