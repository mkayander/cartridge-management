from django.core.management import call_command
from django.db.models.signals import post_save
from django.dispatch import receiver


# @receiver(post_save)
# def backup_db_to_json():
#     call_command("backup", "all")
#     print("backup_db_to_json called")
