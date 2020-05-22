from main.models import Cartridge, Supply, Order
from chat.models import ChatMessage
from rest_framework import serializers


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


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
