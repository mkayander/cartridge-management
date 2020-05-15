from api.views import CartridgeViewSet, SupplyViewSet, OrderViewSet
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register('cartridges', CartridgeViewSet)
router.register('supplies', SupplyViewSet)
router.register('orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls'))
]
