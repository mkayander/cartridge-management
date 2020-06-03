from pprint import pprint

from django.db.models.signals import post_save
from django.dispatch import receiver
from django_mailbox.signals import message_received

from main.models import Supply, Order


# @receiver(post_save, sender=Supply)
# def backup_db_to_json(sender, instance, created, **kwargs):
#     # call_command("backup", "all")
#     print("backup_db_to_json called")
#     pprint(instance.__dict__, indent=2)


@receiver(message_received)
def mail_received(sender, message, **kwargs):
    print(f"I just received a message titled {message.subject} from a mailbox named {message.mailbox.name}")
    # pprint(sender.__dict__, indent=2)
    pprint(message.__dict__, indent=2)

    if message.in_reply_to_id:
        print("Trying to get the order")
        try:
            order = Order.objects.get(email__pk=message.in_reply_to_id)
            pprint(order.__dict__)
        except Order.DoesNotExist as e:
            print(e)

        # -- OR --
        # target_msg = Message.objects.get(pk=message.in_reply_to_id)
        # if target_msg.order:
        #     order = target_msg.order
        #     pprint(order.__dict__)
