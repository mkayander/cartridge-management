import json

from django.core.management.base import BaseCommand
from django.core.serializers.json import DjangoJSONEncoder
from main.models import Cartridge, Supply


class Command(BaseCommand):
    help = "Gets all needed data from Django database, converts it to JSON and stores on disk"

    def add_arguments(self, parser):
        parser.add_argument('action', nargs='+', type=str)

    def handle(self, *args, **options):
        print("called")
        if "all" in options["action"***REMOVED***:
            db = {
                "Cartridge": list(Cartridge.objects.values()),
                "Supply": list(Supply.objects.values())
            ***REMOVED***

            with open("db.json", 'w+') as outfile:
                json.dump(db, outfile, sort_keys=True, indent=4, cls=DjangoJSONEncoder)
            self.stdout.write(self.style.SUCCESS("Successfully backed up database to db.json"))
