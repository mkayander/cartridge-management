import simplejson as simplejson
from django.shortcuts import render, redirect

from api.serializers import SupplySerializer
from main.forms import SupplyForm

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
    formSupply = SupplyForm(request)
    return render(request, "NewSupply.html", {"supply": supply, "formSupply": formSupply})
def supply_view(request):
    if request.method == "POST":
        print("supply_view POST!"+'\n', request.POST)
        form = SupplyForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')

    elif request.method == "GET":
        print("supply_view GET!")
        # supply = Supply.objects.all().order_by("-date")
        form = SupplyForm()
        return render(request, "SupplyView.html", {"form": form})
