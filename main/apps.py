from django.apps import AppConfig


class MainConfig(AppConfig):
    name = 'main'
    verbose_name = 'Картриджи & Принтеры'

    def ready(self):
        import main.receivers
