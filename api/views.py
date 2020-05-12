from api.serializers import CartridgeSerializer
from main.models import Cartridge
from rest_framework import viewsets


class CartridgeViewSet(viewsets.ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer
