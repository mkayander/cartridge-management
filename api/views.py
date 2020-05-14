from api.serializers import CartridgeSerializer, SupplySerializer
from main.models import Cartridge, Supply
from rest_framework import viewsets


class CartridgeViewSet(viewsets.ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer


class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.all()
    serializer_class = SupplySerializer

    def initialize_request(self, request, *args, **kwargs):
        print(request, '\n', request.headers)
        return super().initialize_request(request, *args, **kwargs)
