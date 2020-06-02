from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import CartridgeSerializer, SupplySerializer, OrderSerializer, ChatMessageSerializer
from chat.models import ChatMessage
from main.models import Cartridge, Supply, Order


class CartridgeViewSet(viewsets.ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer


class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.select_related('cartridge')
    serializer_class = SupplySerializer

    def initialize_request(self, request, *args, **kwargs):
        print(request, '\n', request.headers, request.body)
        return super().initialize_request(request, *args, **kwargs)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def initialize_request(self, request, *args, **kwargs):
        print(request, '\n', request.headers, request.body)
        return super().initialize_request(request, *args, **kwargs)

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)


class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer


@api_view(["GET"])
def home_data_view(request):
    return Response({
        "cartridges": CartridgeSerializer(Cartridge.objects.all(), many=True, context={"request": request}).data,
        "supplies": SupplySerializer(Supply.objects.select_related('cartridge'), many=True,
                                     context={"request": request}).data,
        "orders": OrderSerializer(Order.objects.all(), many=True, context={"request": request}).data,
        "chatMessage": ChatMessageSerializer(ChatMessage.objects.all()[:50], many=True, context={"request": request}).data
    })
