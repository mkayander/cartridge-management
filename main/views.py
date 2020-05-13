import simplejson as simplejson
from django.shortcuts import render

from api.serializers import SupplySerializer

from main.models import Cartridge, Supply


def view(request):
    cartridges = Cartridge.objects.all()
    supply = Supply.objects.all().order_by("-date")
    data = {***REMOVED***

    for obj in Cartridge.objects.all().values():
        data[obj["name"***REMOVED******REMOVED*** = obj
    cartridges_json = simplejson.dumps(data)

    # data = {***REMOVED***
    # for obj in Supply.objects.all().values():
    #     print(obj)
    #     print(obj["id"***REMOVED***)
    #     data[obj["id"***REMOVED******REMOVED*** = obj
    # supply_json = simplejson.dumps(data)
    supply_json = {***REMOVED***

    return render(request, "MainPage.html", {
        "cartridges": cartridges,
        "cartridges_json": cartridges_json,
        "supply_json": supply_json,
        "supply": supply
    ***REMOVED***)
