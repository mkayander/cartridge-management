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
    Mailbox.objects.get(name="oks-dellin").get_new_mail()
