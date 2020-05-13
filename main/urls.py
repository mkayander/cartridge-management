from django.urls import path, include

from main import views

urlpatterns = [
    path('', views.view, name="index"),
    path("NewSupply/", views.newSupplyView, name="new_supply")
***REMOVED***
