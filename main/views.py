from django.http import Http404
from django.shortcuts import render, redirect

from main.forms import SupplyForm

from main.models import Cartridge, Supply

def view(request):
    cartridges = Cartridge.objects.all()
    supply = Supply.objects.all().order_by("-date")

    form = SupplyForm()

    if request.method == "POST":
        print("supply_view POST!" + '\n', request.POST)
        form = SupplyForm(request.POST)
        print(request.POST["count"***REMOVED***)
        print(Cartridge.objects.get(pk=request.POST["cartridge"***REMOVED***).count)
        if form.is_valid():
            form.save()
            return redirect('index')
        else:
            raise Http404

    return render(request, "MainPage.html", {
        "cartridges": cartridges,
        "supply": supply,
        "form": form
    ***REMOVED***)
