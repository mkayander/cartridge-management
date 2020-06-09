from django_mailbox.models import Message
from rest_framework import serializers

from chat.models import ChatMessage
from main.models import Cartridge, Supply, Order


class CartridgeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cartridge
        fields = ["url", "name", "manufacturer", "count"]


class SupplySerializer(serializers.ModelSerializer):
    cartridge_str = serializers.StringRelatedField(source='cartridge', read_only=True, required=False)

    class Meta:
        model = Supply
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class MailSerializer(serializers.ModelSerializer):
    # decoded_body = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields = ['id', 'subject', 'message_id', 'from_header', 'to_header', 'outgoing', 'processed', 'read', 'mailbox',
                  'in_reply_to', 'text', 'html']

    # def get_decoded_body(self, obj):
    #     return obj.get_email_object()


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
