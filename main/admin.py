from django.contrib import admin

from main.models import Cartridge, Supply, Order, Service
# from telegram.models import Profile, Message
from telegram.models import EquipMovement
# from telegram.forms import ProfileForm

class CartridgeAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["name", "manufacturer", "count"]


class SupplyAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["date", "out", "cartridge", "count", "comment"]


class OrderAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["date", "status", "date_finished", "finished", "number", "cartridge", "count"]


class ServiceAdmin(admin.ModelAdmin):
    list_display = ["date", "status", "date_finished", "finished"]


class EquipMovementAdmin(admin.ModelAdmin):
    list_display = ["created_at", "telegram_user_id", "inv_number", "comment", "inv_image"]


# class ProfileAdmin(admin.ModelAdmin):
#     list_display = ["id", "external_id", "name"]
#     form = ProfileForm
#
#
# class MessageAdmin(admin.ModelAdmin):
#     list_display = ['created_at', 'profile', 'text']


admin.site.register(Cartridge, CartridgeAdmin)
admin.site.register(Supply, SupplyAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(EquipMovement, EquipMovementAdmin)
# admin.site.register(Profile, ProfileAdmin)
# admin.site.register(Message, MessageAdmin)
# Register your models here.
