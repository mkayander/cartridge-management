from main.models import Cartridge, Supply
from rest_framework import serializers


class CartridgeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cartridge
        fields = '__all__'


class SupplySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Supply
        fields = '__all__'
