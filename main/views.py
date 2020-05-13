import simplejson as simplejson
from django.shortcuts import render

from api.serializers import SupplySerializer

from main.models import Cartridge, Supply


def view(request):
    cartridges = Cartridge.objects.all()
    supply = Supply.objects.all().order_by("-date")
    data = {}

    for obj in Cartridge.objects.all().values():
        data[obj["name"]] = obj
    cartridges_json = simplejson.dumps(data)

    # data = {}
    # for obj in Supply.objects.all().values():
    #     print(obj)
    #     print(obj["id"])
    #     data[obj["id"]] = obj
    # supply_json = simplejson.dumps(data)
    supply_json = {}

    return render(request, "MainPage.html", {
        "cartridges": cartridges,
        "supply": supply
    })


def newSupplyView(request):
    supply = Supply.objects.all().order_by("-date")
    return render(request, "NewSupply.html", {"supply": supply})
