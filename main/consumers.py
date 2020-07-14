import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class LiveDataConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'liveData'

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
    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        print(f"message --- {message}")

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'refresh_data',
                'message': message
            }
        )

    # Receive message from room group
    def refresh_data(self, event):
        '''
        Call back function to send message to the browser
        '''
        message = event['refresh']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
