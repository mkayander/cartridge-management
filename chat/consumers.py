import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import ChatMessage


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # self.room_name = self.scope['url_route'***REMOVED***['kwargs'***REMOVED***['room_name'***REMOVED***
        # self.room_name = self.scope['url_route'***REMOVED***['kwargs'***REMOVED***
        # self.room_group_name = 'chat_%s' % self.room_name
        self.room_group_name = 'chat'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message'***REMOVED***
        user = text_data_json['user'***REMOVED***
        ChatMessage.objects.create(user=user, message=message)
        print(f"{user***REMOVED*** message --- {message***REMOVED***")

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
        ***REMOVED***
                'type': 'chat_message',
                'user': user,
                'message': message
            ***REMOVED***
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message'***REMOVED***
        user = event['user'***REMOVED***

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'user': user
        ***REMOVED***))
