from django.urls import path, include
# from django.contrib import admin

from main import views

urlpatterns = [
    path('', views.view, name="index"),

    # path("supply/", views.supply_view, name="supply")
]
