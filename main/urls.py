from django.urls import path, include
# from django.contrib import admin

from main import views

urlpatterns = [
    # path('', views.view, name="index"),
    path('chat/', include("chat.urls")),
    path('', views.FrontendAppView.as_view(), name="react"),
    path('test', views.FrontendAppView.as_view(), name="react")
    # path("supply/", views.supply_view, name="supply")
***REMOVED***
