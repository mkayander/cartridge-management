from django.apps import AppConfig


class TelegramConfig(AppConfig):
    name = 'telegram'
    verbose_name = 'Телеграм'

    def ready(self):
        from telegram.management.commands.bot import print_test
