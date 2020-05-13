from api.serializers import CartridgeSerializer, SupplySerializer
from main.models import Cartridge, Supply
from rest_framework import viewsets


class CartridgeViewSet(viewsets.ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer


class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.all()
    serializer_class = SupplySerializer
