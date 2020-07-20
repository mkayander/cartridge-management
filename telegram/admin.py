from django.contrib import admin

from telegram.models import EquipMovement, AdditionalPhoto


class EquipMovementAdmin(admin.ModelAdmin):
    list_display = ["created_at", "telegram_user_id", "inv_number", "comment", "inv_image"]


class AdditionalPhotoAdmin(admin.ModelAdmin):
    list_display = ["movement", "image"]


admin.site.register(AdditionalPhoto, AdditionalPhotoAdmin)
admin.site.register(EquipMovement, EquipMovementAdmin)
