import simplejson as simplejson
from django.shortcuts import render

from main.models import Cartridge


def view(request):
    cartridges = Cartridge.objects.all()
    data = {}
    for obj in Cartridge.objects.all().values():
        data[obj["id"]] = obj
    cartridges_json = simplejson.dumps(data)
    return render(request, "MainPage.html", {
        "cartridges": cartridges,
        "cartridges_json": cartridges_json
    })
