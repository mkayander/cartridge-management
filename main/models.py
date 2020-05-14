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
    date = models.DateTimeField(auto_now=True)
    count = models.PositiveIntegerField(verbose_name="Количество")
    comment = models.TextField(max_length=200, verbose_name="Комментарий", blank=True)

    def __str__(self):
        return str(self.date)

    def update_cartridge_count(self, value):
        print(f"Updating cartridge count: {value***REMOVED*** ; {self.out=***REMOVED***")
        if value is not 0 and not None:
            if self.out:
                self.cartridge.count -= value
            else:
                self.cartridge.count += value

            self.cartridge.save()

    def save(self, *args, **kwargs):
        if self.pk is None:
            # If supply is new
            self.update_cartridge_count(self.count)
        else:
            # If supply exists and got updated
            prev_count = Supply.objects.get(pk=self.pk).count
            difference = self.count - prev_count
            self.update_cartridge_count(difference)
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self.update_cartridge_count(self.count * -1)
        return super().delete(using, keep_parents)
