from django.core.mail import mail_admins
from django.core.management import call_command
from django.template.loader import render_to_string
from django_mailbox.models import Mailbox, Message

from cartridge.celery import app
from main.models import Order


# import main.receivers
# import main.models

# @shared_task
# def sleepy(duration):
#     sleep(duration)
#     print("slept")
#     return None

@app.task
def hello_world():
    print("Hello world!")


@app.task
def refresh_oks_email():
    for message in Mailbox.objects.get(name="oks-dellin").get_new_mail():
        print(message)


@app.task
def save_test():
    Order.objects.first().save()


@app.task
def run_mailbox_getmail():
    call_command("getmail")


@app.task
def backup_db_to_json():
    call_command("backup", "all")


@app.task
def notify_admins(subject: str, text: str, message: Message = None, answer_str: str = None):
    mail_admins(subject, text, html_message=render_to_string('AdminNotifyMsg.html',
                                                             {text: text, message: message, answer_str: answer_str}))
