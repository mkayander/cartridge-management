from api.serializers import CartridgeSerializer, SupplySerializer, OrderSerializer
from main.models import Cartridge, Supply, Order
from rest_framework import viewsets


class CartridgeViewSet(viewsets.ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer


class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.all().order_by("-date")
    serializer_class = SupplySerializer

    def initialize_request(self, request, *args, **kwargs):
        print(request, '\n', request.headers, request.body)
        return super().initialize_request(request, *args, **kwargs)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
