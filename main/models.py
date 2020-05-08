from django.db import models
from main import choices


class Cartridge(models.Model):
    manufacturer = models.CharField(max_length=30, choices=choices.MANUFACTURER_CHOICES, default="HP")
    name = models.CharField(max_length=30)
    count = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class Supply(models.Model):
    out = models.BooleanField(default=True)
    cartridge = models.ForeignKey(Cartridge, related_name="supplies", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    count = models.PositiveIntegerField()

    def __str__(self):
        return str(self.date)

    def save(self, *args, **kwargs):
        if self.pk is None:
            if self.out:
                self.cartridge.count -= self.count
                self.cartridge.save()
            else:
                self.cartridge.count += self.count
                self.cartridge.save()
        super().save(*args, **kwargs)
