from django.contrib import admin

from telegram.models import EquipMovement


class EquipMovementAdmin(admin.ModelAdmin):
    list_display = ["created_at", "telegram_user_id", "inv_number", "comment", "inv_image"]


admin.site.register(EquipMovement, EquipMovementAdmin)
