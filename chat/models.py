from datetime import datetime

from django.db import models


class ChatMessage(models.Model):
    user = models.CharField(max_length=50)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']
