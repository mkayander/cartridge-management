from django.urls import path, include

from main import views

urlpatterns = [
    path('', views.view, name="index"),
    path("NewSupply/", views.supply_view, name="new_supply"),
    path("supply/", views.supply_view, name="supply")
]
