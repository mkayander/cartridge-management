from django.contrib import admin

from main.models import Cartridge, Supply


class CartridgeAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["name", "manufacturer", "count"]
    pass


class SupplyAdmin(admin.ModelAdmin):
    # fields = '__all__'
    list_display = ["date", "out", "cartridge", "count", "comment"]
    pass


admin.site.register(Cartridge, CartridgeAdmin)
admin.site.register(Supply, SupplyAdmin)
# Register your models here.
