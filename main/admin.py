from django.contrib import admin

from main.models import Cartridge, Supply, Order


class CartridgeAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["name", "manufacturer", "count"]


class SupplyAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["date", "out", "cartridge", "count", "comment"]


class OrderAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["date", "date_finished", "finished", "number", "cartridge", "count"]


admin.site.register(Cartridge, CartridgeAdmin)
admin.site.register(Supply, SupplyAdmin)
admin.site.register(Order, OrderAdmin)
# Register your models here.