from typing import Type, Tuple

from main.models import EmailRequestModel, Order, Service

NOTIFY_MESSAGES = {
    "Order": {
        "answer": {
            "subject": "Получен ответ к заказу на картриджи {}",
            "body": "Заказ на {} картриджей {} принят в работу. Присвоен номер {}"
        }
    },
    "Service": {
        "answer": {
            "subject": "Получен ответ к заказу на ремонт {}",
            "body": "Заказ на ремонт принтера {} принят в работу. Присвоен номер {}"
        }
    },
}


def get_notify_answer(order: Type[EmailRequestModel]) -> Tuple[str, str]:
    """
    :param order: Must be a child of EmailRequestModel - either Order or Service.
    :return: Tuple of 2 string values - subject and body.
    """
    subject = NOTIFY_MESSAGES[order.__class__.__name__]["answer"]["subject"].format(order)

    if isinstance(order, Order):
        body = NOTIFY_MESSAGES[Order.__name__]["answer"]["body"].format(order.count, order.cartridge, order.number)
    elif isinstance(order, Service):
        body = NOTIFY_MESSAGES[Service.__name__]["answer"]["body"].format(order.printer, order.number)
    else:
        raise ValueError("Order instance must be either Order or Service!")

    return subject, body
