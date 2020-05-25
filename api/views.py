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


class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer


@api_view(["GET"***REMOVED***)
def home_data_view(request):
    return Response({
        "cartridges": CartridgeSerializer(Cartridge.objects.all(), many=True, context={"request": request***REMOVED***).data,
        "supplies": SupplySerializer(Supply.objects.select_related('cartridge'), many=True,
                                     context={"request": request***REMOVED***).data,
        "orders": OrderSerializer(Order.objects.all(), many=True, context={"request": request***REMOVED***).data,
        "chatMessage": ChatMessageSerializer(ChatMessage.objects.all()[:50***REMOVED***, many=True, context={"request": request***REMOVED***).data
    ***REMOVED***)
