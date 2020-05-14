from main.models import Cartridge, Supply
from rest_framework import serializers


class CartridgeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cartridge
        fields = ["url", "name", "manufacturer", "count"]


class SupplySerializer(serializers.ModelSerializer):
    cartridge_str = serializers.StringRelatedField(source='cartridge')

    class Meta:
        model = Supply
        fields = '__all__'
