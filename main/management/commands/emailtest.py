import json

# from django.apps import apps
from django.core.management.base import BaseCommand
# from django.core.serializers.json import DjangoJSONEncoder
# from django.db.models import Value, BooleanField

#from main.models import Cartridge, Supply, Order
from django_mailbox.models import Message
from main.tasks import notify_admins

def get_item_key(obj):
	return obj["id"] if "id" in obj else obj["name"]


class Command(BaseCommand):
	# help = "Gets all needed data from Django database, converts it to JSON and stores on disk"

#	def add_arguments(self, parser):
#		parser.add_argument('action', nargs='+', type=str)

	def handle(self, *args, **options):
		msg = Message.objects.last()
		notify_admins.delay("Проверка оповещений", "Тут находится текст оповещения, по письму:", msg.subject, msg.text)
		self.stdout.write(self.style.SUCCESS("Sent"))

