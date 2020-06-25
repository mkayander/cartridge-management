# from mailbox import Message
import json

from constance import config
from django_mailbox.models import Message
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import CartridgeSerializer, SupplySerializer, OrderSerializer, ChatMessageSerializer, \
    MailSerializer
from chat.models import ChatMessage
from main.models import Cartridge, Supply, Order


class CartridgeViewSet(viewsets.ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer


class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.select_related('cartridge')
    serializer_class = SupplySerializer

    def initialize_request(self, request, *args, **kwargs):
        # print(request, '\n', request.headers, request.body)
        return super().initialize_request(request, *args, **kwargs)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # def initialize_request(self, request, *args, **kwargs):
    #     # print(request, '\n', request.headers, request.body)
    #     return super().initialize_request(request, *args, **kwargs)
    #
    # def get_object(self):
    #     print("get_object")
    #     return super().get_object()
    #
    # def retrieve(self, request, *args, **kwargs):
    #     print("retrieve")
    #     return super().retrieve(request, *args, **kwargs)

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)


class MailViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MailSerializer


class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer


@api_view(["GET"])
# @permission_classes([permissions.AllowAny])
def home_data_view(request):
    return Response({
        "cartridges": CartridgeSerializer(Cartridge.objects.all(), many=True, context={"request": request}).data,
        "supplies": SupplySerializer(Supply.objects.select_related('cartridge'), many=True,
                                     context={"request": request}).data,
        "orders": OrderSerializer(Order.objects.all(), many=True, context={"request": request}).data,
        "chatMessage": ChatMessageSerializer(ChatMessage.objects.all()[:50], many=True,
                                             context={"request": request}).data
    })


@api_view(["POST"])
# @permission_classes([permissions.IsAuthenticated])
def send_order_view(request, order_pk):
    # if request.is_ajax():
    try:
        order = Order.objects.get(pk=order_pk)
        if not order.email or config.EMAIL_ALLOW_RESEND:
            if "take_old_away" in request.data and request.data["take_old_away"] is True and not order.take_old_away:
                order.take_old_away = True

            order.send_to_manager([config.EMAIL_MANAGER_ADDRESS])
            return Response({"result": "sent"})
        return Response({"result": "Email already sent"}, status=400)
    except Order.DoesNotExist:
        return Response({"result": f"Order with pk = {order_pk} does not exist."}, status=400)
