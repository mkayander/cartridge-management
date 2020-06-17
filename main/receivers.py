from django.dispatch import receiver
from django_mailbox.signals import message_received

from main.models import Order


# @receiver(post_save, sender=Supply)
# def backup_db_to_json(sender, instance, created, **kwargs):
#     # call_command("backup", "all")
#     print("backup_db_to_json called")
#     pprint(instance.__dict__, indent=2)


def request_id_is_valid(id_string: str):
    return len(id_string) == 4 and id_string.isnumeric()


@receiver(message_received)
def mail_received(sender, message, **kwargs):
    print(f"I just received a message titled {message.subject} from a mailbox named {message.mailbox.name}")

    if message.in_reply_to_id:
        # Trying to get the order
        try:
            order = Order.objects.get(email__pk=message.in_reply_to_id)
            answer_str = message.text[0: message.text.find(message.mailbox.from_email)]  # Strip the quote part

            if "заявка принята" in answer_str.lower():
                subject_id = text_id = None
                # Try to get request id from email subject:
                subject_id_string = message.subject.split()[-1]
                if request_id_is_valid(subject_id_string):
                    subject_id = int(subject_id_string)

                # Try to get request id from email text:
                num_index = answer_str.find('№')
                if num_index != -1:
                    if answer_str[num_index+1].isspace():
                        answer_str = answer_str[:num_index+1] + answer_str[num_index+2:]
                    id_string = answer_str[num_index + 1: num_index + 5]
                    if request_id_is_valid(id_string):
                        text_id = int(id_string)
                else:
                    try:
                        text_arr = answer_str.split()
                        index = text_arr.index("заявки")
                        id_string = text_arr[index + 1].strip().strip('.')
                        if request_id_is_valid(id_string):
                            text_id = int(id_string)
                        # TODO: Try to make this pattern repeat less
                    except ValueError as e:
                        print(e)

                request_id = text_id or subject_id
                if request_id:
                    order.to_work(request_id)
                else:
                    print("Failed to retrieve external request id from email subject and text")

            else:
                print("Keyword not found in email text")

        except Order.DoesNotExist as exception:
            print(f'There is no order with email pk being set to {message.in_reply_to_id}',
                  exception, sep='\n')

        # -- OR --
        # target_msg = Message.objects.get(pk=message.in_reply_to_id)
        # if target_msg.order:
        #     order = target_msg.order
        #     pprint(order.__dict__)
