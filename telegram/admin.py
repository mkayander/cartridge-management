from django.contrib import admin

from telegram.models import EquipMovement, UploadPhoto


class EquipMovementAdmin(admin.ModelAdmin):
    list_display = ["created_at", "telegram_user_id", "inv_number", "comment", "inv_image"]


class UploadPhotoAdmin(admin.ModelAdmin):
    list_display = ["em", "image"]


admin.site.register(UploadPhoto, UploadPhotoAdmin)
admin.site.register(EquipMovement, EquipMovementAdmin)
