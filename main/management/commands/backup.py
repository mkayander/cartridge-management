import json

from django.apps import apps
from django.core.management.base import BaseCommand
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Value, BooleanField

from main.models import Cartridge, Supply, Order


def get_item_key(obj):
    return obj["id"] if "id" in obj else obj["name"]


class Command(BaseCommand):
    help = "Gets all needed data from Django database, converts it to JSON and stores on disk"

    def add_arguments(self, parser):
        parser.add_argument('action', nargs='+', type=str)

    def handle(self, *args, **options):
        if "all" in options["action"]:
            db = {
                "Cartridge": list(Cartridge.objects.annotate(restoring=Value(True, BooleanField())).values()),
                "Supply": list(Supply.objects.annotate(restoring=Value(True, BooleanField())).values()),
                "Order": list(Order.objects.annotate(restoring=Value(True, BooleanField())).values())
            }

            with open("db.json", 'w+') as outfile:
                json.dump(db, outfile, sort_keys=True, indent=4, cls=DjangoJSONEncoder)
            self.stdout.write(self.style.SUCCESS("Successfully backed up database to db.json"))

        elif "restore" in options["action"]:
            with open("db.json", 'r') as file:
                saved_data = json.load(file)
                for key, values in saved_data.items():
                    model = apps.get_model("main", key)
                    for obj in values:
                        try:
                            print(get_item_key(obj))
                            model.objects.get(pk=get_item_key(obj))
                        except model.DoesNotExist:
                            print(f'Restoring -- {obj}')
                            model.objects.create(**obj)
                            # print("done")

                self.stdout.write(self.style.SUCCESS("Successfully restored database from db.json"))

        elif "reload-all" in options["action"]:
            with open("db.json", 'r') as file:
                saved_data = json.load(file)
                for key, values in saved_data.items():
                    model = apps.get_model("main", key)
                    for obj in values:
                        try:
                            instance = model.objects.get(pk=get_item_key(obj))

                            for attr, value in obj.items():
                                setattr(instance, attr, value)
                            instance.save()
                        except model.DoesNotExist:
                            self.stdout.write(self.style.ERROR(f"Object {obj} does not exist!"))

                self.stdout.write(self.style.SUCCESS("Reloaded from db.json"))

        elif "reload-cartridges" in options["action"]:
            with open("db.json", 'r') as file:
                saved_data = json.load(file)
                for obj in saved_data["Cartridge"]:
                    try:
                        cartridge = Cartridge.objects.get(pk=obj["name"])
                        print(obj.items())
                        for attr, value in obj.items():
                            setattr(cartridge, attr, value)
                        cartridge.save()
                    except Cartridge.DoesNotExist:
                        self.stdout.write(self.style.ERROR(f"Cartridge {obj.name} does not exist!"))

                self.stdout.write(self.style.SUCCESS("Cartridges reloaded from db.json"))

        else:
            self.stdout.write(self.style.ERROR(f"Action {options['action']} not recognized!"))
