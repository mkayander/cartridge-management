from constance import config
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_celery_beat.models import PeriodicTask, IntervalSchedule
from django_mailbox.models import Message
from django_mailbox.signals import message_received

from main.models import Order, Cartridge
from main.tasks import notify_admins


def request_id_is_valid(id_string: str):
    """
    Does specific checks for the id string and returns True if it complies.
    :rtype: bool
    :param id_string: string that is a numeric id
    """
    return len(id_string) == 4 and id_string.isnumeric()


@receiver(post_save, sender=Cartridge)
def check_cartridge_count(instance, **kwargs):
    """
    Creates a new Order if cartridge amount is less than required.
    """
    if instance.count < config.CARTRIDGE_MIN_COUNT:
        if not Order.objects.filter(cartridge=instance).exclude(status="finished").exists():
            print(f"Amount of {instance} is less then required and no active order is found, creating new.")
            order = Order.objects.create(cartridge=instance, count=config.CARTRIDGE_DEF_AMOUNT)
            notify_admins \
                .delay(f"Подтвердите заказ на картриджи {instance}",
                       f"""Количество картриджей {instance} стало меньше минимума ({config.CARTRIDGE_MIN_COUNT}) - 
                          их {instance.count} шт. Был создан новый заказ на {config.CARTRIDGE_DEF_AMOUNT} шт.""",
                       f"Требуется подтвердить отправку письма менеджеру - http://it-vlshv.dellin.local/?orderId={order.id}")


@receiver(post_save, sender=Order)
def check_if_waiting_email(**kwargs):
    """
    Makes the email refresh task run more often if there's at least one order that is waiting for the answer.
    """
    print("Checking if orders waiting for email...")
    try:
        refresh_task = PeriodicTask.objects.get(name=config.EMAIL_REFRESH_TASK_NAME)
        old_interval = refresh_task.interval
        if Order.objects.filter(status="pending").exists():
            print("Order with pending status detected!")
            refresh_task.interval = IntervalSchedule.objects.get_or_create(every=5, period="minutes")[0]
        else:
            refresh_task.interval = IntervalSchedule.objects.get_or_create(every=1, period="days")[0]
            print("No pending orders, settings long delay.")

        if refresh_task.interval != old_interval:  # Don't run useless sql query
            refresh_task.save()

    except PeriodicTask.DoesNotExist as e:
        print(f"Periodic Task with name {config.EMAIL_REFRESH_TASK_NAME} not found,\n" +
              "check if it exists or correct the name value in constance config!\n" + str(e))


@receiver(message_received)
def mail_received(message, **kwargs):
    """
    Main incoming email callback. Checks if message is the answer to any local Order, tries to get the external id from
    the message and set's it to the order if found, with Order status also changed to "work".
    """
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
                    if answer_str[num_index + 1].isspace():  # if there's a space after '№' remove it
                        answer_str = answer_str[:num_index + 1] + answer_str[num_index + 2:]
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
                    notify_admins.delay(f"Получен ответ на заказ {order}",
                                        f"Заказ на {order.count} картриджей {order.cartridge} принят в работу",
                                        f"присвоен номер {order.number}",
                                        answer_str)
                else:
                    notify_admins \
                        .delay("Ошибка обработки входящего письма",
                               f"Был получен ответ на письмо от заказа {order}, но не удалось извлеч номер заказа",
                               message.subject,
                               message.text,
                               answer_str)
                    print("Failed to retrieve external request id from email subject and text")

            else:
                notify_admins.delay("Ошибка обработки входящего письма",
                                    f"Получен ответ на заказ {order}, но отсутствует ключевое слово.",
                                    message.text)
                print("Keyword not found in email text")

        except Order.DoesNotExist as exception:
            print(f'There is no order with email pk being set to {message.in_reply_to_id}',
                  exception, sep='\n')
            notify_admins.delay("Ошибка обработки входящего письма",
                                f"""Входящее письмо было ответом на {Message.objects.get(id=message.in_reply_to_id)} 
                                К этому письму не привязан ни один заказ.""",
                                message.subject,
                                message.text)
