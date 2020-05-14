from django.forms import ModelForm

from main.models import Supply


class SupplyForm(ModelForm):
    class Meta:
        model = Supply
        # fields = ['pub_date', 'headline', 'content', 'reporter']
        fields = '__all__'

