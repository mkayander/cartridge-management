from django.contrib import admin

from main.models import Cartridge, Supply, Order, Service, Equipment


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


class EquipmentAdmin(admin.ModelAdmin):
    list_display = ["inv_number", "serial_number", "type", "model", "responsible_employee"]
    search_fields = ["inv_number"]
    list_filter = ["type"]

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
admin.site.register(Equipment, EquipmentAdmin)
# admin.site.register(Profile, ProfileAdmin)
# admin.site.register(Message, MessageAdmin)
# Register your models here.
