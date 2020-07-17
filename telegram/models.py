from django.db import models


class Profile(models.Model):
    external_id = models.PositiveIntegerField(verbose_name="User ID", unique=True)
    name = models.CharField(max_length=50, verbose_name="User name")

    def __str__(self):
        return f'{self.external_id} {self.name}'

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"


class Message(models.Model):
    profile = models.ForeignKey(to='telegram.Profile', verbose_name="Profile", on_delete=models.PROTECT)
    text = models.TextField(verbose_name="Text")
    created_at = models.DateTimeField(verbose_name="Message time", auto_now_add=True)

    def __str__(self):
        return f'User: {self.profile} \nMessage: {self.pk} '

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
