from django.shortcuts import render

from main.models import Cartridge


def view(request):
    cartridges = Cartridge.objects.all()
    return render(request, "MainPage.html", {"cartridges": cartridges})
