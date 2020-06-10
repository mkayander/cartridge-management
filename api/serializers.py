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
    # html_message = serializers.SerializerMethodField()
    email_is_sent = serializers.SerializerMethodField()

    # def get_html_message(self):
    #     return self.html_message()

    def get_email_is_sent(self, obj):
        return obj.email is not None

    class Meta:
        model = Order
        fields = ["id", "status", "date", "destination", "edited_at", "date_finished", "number", "finished", "count",
                  "cartridge", "supply", "email", "email_is_sent", "html_message"]


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
