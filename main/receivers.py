# @receiver(post_save)
# def backup_db_to_json():
#     call_command("backup", "all")
#     print("backup_db_to_json called")
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_mailbox.signals import message_received

from main.models import Supply


@receiver(message_received)
def mail_inbox(sender, message, **kwargs):
    print(f"I just received a message titled {message.subject} from a mailbox named {message.mailbox.name} \n", sender,
          '\n', message)


@receiver(post_save, sender=Supply)
def saved_test(sender, instance, created, using, **kwargs):
    print(sender, instance, created, using, sep='\n')
