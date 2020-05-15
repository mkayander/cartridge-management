from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from django import forms

from main.models import Supply, Order


class SupplyForm(forms.ModelForm):
    # def __init__(self, *args, **kwargs):
    #     super(SupplyForm, self).__init__(*args, **kwargs)
    #     self.helper = FormHelper()
    #     self.helper.form_id = 'id-exampleForm'
    #     self.helper.form_class = 'blueForms'
    #     self.helper.form_method = 'post'
    #     self.helper.form_action = 'submit_survey'
    #
    #     self.helper.add_input(Submit('submit', 'Submit'))

    class Meta:
        model = Supply
        fields = '__all__'


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = '__all__'
