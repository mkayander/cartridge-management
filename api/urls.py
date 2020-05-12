from api.views import CartridgeViewSet
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register('cartridges', CartridgeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls'))
***REMOVED***
