from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('liveData', consumers.LiveDataConsumer.as_asgi()),
]
