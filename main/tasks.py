from django.core.management import call_command
from django_mailbox.models import Mailbox

from cartridge.celery import app


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
def run_mailbox_getmail():
    call_command("getmail")


@app.task
def backup_db_to_json():
    call_command("backup", "all")
