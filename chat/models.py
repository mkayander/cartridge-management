from datetime import datetime

from django.db import models


class ChatMessage(models.Model):
    User = models.CharField(max_length=50)
    Message = models.TextField()
    Date = models.DateTimeField(auto_now_add=True)
