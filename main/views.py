from django.http import Http404
from django.shortcuts import render, redirect

from main.forms import SupplyForm, OrderForm

from main.models import Cartridge, Supply, Order


def view(request):
    cartridges = Cartridge.objects.all()
    supply = Supply.objects.all().order_by("-date")
    order = Order.objects.all().order_by("-date")

    formSupply = SupplyForm()
    formOrder = OrderForm()

    if request.method == "POST":
        formSupply = SupplyForm(request.POST)
        formOrder = OrderForm(request.POST)
        if formSupply.is_valid():
            formSupply.save()
            return redirect('index')
        elif formOrder.is_valid():
            formOrder.save()
            return redirect('index')
        else:
            raise Http404

    return render(request, "MainPage.html", {
        "cartridges": cartridges,
        "supply": supply,
        "formSupply": formSupply,
        "order": order,
        "formOrder": formOrder
    ***REMOVED***)
