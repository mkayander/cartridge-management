from django.db import models


class EquipMovement(models.Model):
    # profile = models.ForeignKey(to='telegram.Profile', verbose_name="Profile", on_delete=models.PROTECT)
    message_id = models.PositiveIntegerField(verbose_name="ИД сообщения")
    telegram_user_id = models.PositiveIntegerField(verbose_name="Имя пользователя")
    inv_number = models.CharField(max_length=20, verbose_name="Инвентарник")
    comment = models.TextField(verbose_name="Коментарий")
    inv_image = models.ImageField(verbose_name="Фото инвентарника", blank=True)
    created_at = models.DateTimeField(verbose_name="Message time", auto_now_add=True)

    def __str__(self):
        return f'{self.created_at} ---- {self.inv_number} ----- {self.comment}'

    class Meta:
        verbose_name = "Пермещение техники"
