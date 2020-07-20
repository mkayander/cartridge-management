from django.db.models.signals import post_delete
from django.dispatch import receiver

from telegram.models import AdditionalPhoto


@receiver(post_delete, sender=AdditionalPhoto)
def bot_test(instance, **kwargs):
    print("Bot test!", instance)
