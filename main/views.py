import simplejson as simplejson
from django.shortcuts import render

from main.models import Cartridge, Supply


def view(request):
    cartridges = Cartridge.objects.all()
    supply = Supply.objects.all().order_by("-date")
    data = {***REMOVED***
    for obj in Cartridge.objects.all().values():
        data[obj["id"***REMOVED******REMOVED*** = obj
    cartridges_json = simplejson.dumps(data)
    return render(request, "MainPage.html", {
        "cartridges": cartridges,
        "cartridges_json": cartridges_json,
        "supply": supply
    ***REMOVED***)
