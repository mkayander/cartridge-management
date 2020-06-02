import os

from django.conf import settings
from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import View

from main.forms import SupplyForm, OrderForm
from main.models import Cartridge, Supply, Order


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            # logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run yarn run build to test the production version.
                """,
                status=501,
            )


def view(request):
    cartridges = Cartridge.objects.all()
    supply = Supply.objects.all().order_by("-date")
    order = Order.objects.all().order_by("-date")

    form_supply = SupplyForm()
    form_order = OrderForm()

    if request.method == "POST":
        form_supply = SupplyForm(request.POST)
        form_order = OrderForm(request.POST)
        if form_supply.is_valid():
            form_supply.save()
            return redirect('index')
        elif form_order.is_valid():
            form_order.save()
            return redirect('index')
        else:
            raise Http404

    return render(request, "MainPage.html", {
        "cartridges": cartridges,
        "supply": supply,
        "formSupply": form_supply,
        "order": order,
        "formOrder": form_order
    })


def order_mail_test(request):
    order = Order.objects.first()

    return render(request, 'OutlookOrder.html', {'order': order})
