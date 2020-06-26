from django.urls import path, include
# from django.contrib import admin

from main import views

urlpatterns = [
    # path('', views.view, name="index"),
    # path('', views.FrontendAppView.as_view(), name="react"),
    path('', views.react_home_view, name="react_home"),
    path('mobile', views.react_home_view, name="react_home_mobile"),
    # path("supply/", views.supply_view, name="supply")
    path('order_mail', views.order_mail_test, name="email_test")
]
