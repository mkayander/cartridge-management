from django.db import models
from django.utils.dateformat import format


class EquipMovement(models.Model):
    # profile = models.ForeignKey(to='telegram.Profile', verbose_name="Profile", on_delete=models.PROTECT)
    message_id = models.PositiveIntegerField(verbose_name="ИД сообщения")
    telegram_user_id = models.PositiveIntegerField(verbose_name="ИД пользователя")
    bot_answer_message_id = models.PositiveIntegerField(verbose_name="Ответ бота", blank=True)
    chat_id = models.IntegerField(verbose_name="ИД чата")
    inv_number = models.CharField(max_length=20, verbose_name="Инвентарный номер")
    comment = models.TextField(verbose_name="Комментарий")
    inv_image = models.ImageField(verbose_name="Фото инвентарного номера", blank=True)
    created_at = models.DateTimeField(verbose_name="Message time", auto_now_add=True)

    def __str__(self):
        return f'{format(self.created_at, "d E Y в H:m")} --- {self.inv_number} --- {self.comment}'

    class Meta:
        verbose_name = "Перемещение техники"
        verbose_name_plural = "Перемещения техники"


class AdditionalPhoto(models.Model):
    movement = models.ForeignKey(EquipMovement, related_name='photos', verbose_name="EquipMovement", on_delete=models.CASCADE)
    message_id = models.PositiveIntegerField(verbose_name="ИД сообщения")
    chat_id = models.IntegerField(verbose_name="ИД чата")
    # bot_answer_message_id = models.PositiveIntegerField(verbose_name="Ответ бота", blank=True)
    image = models.ImageField(verbose_name="Дополнительное фото", blank=True)

    class Meta:
        verbose_name = "Дополнительное фото"
        verbose_name_plural = "Дополнительные фото"
