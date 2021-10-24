from allauth.account.forms import SignupForm
from users import models as UserModel
from django import forms
from django.forms import ModelForm
import datetime



class MyCustomSignupForm(SignupForm):
    first_name = forms.CharField(max_length=20, label='First Name')
    last_name = forms.CharField(max_length=20, label='Last Name')
    phone = forms.CharField(max_length=20, label='Phone Number')

    # doctor = forms.ModelChoiceField(queryset=UserModel.Doctor.objects.all(), 
    #                               empty_label=None, label="MD",
    #                               widget=forms.Select(attrs={'class':'form-control'}))
    def save(self, request):
        user = super(MyCustomSignupForm, self).save(request)
        user.first_name=self.cleaned_data['first_name']
        user.last_name=self.cleaned_data['last_name']
        user.phone=self.cleaned_data['phone']
        # user.doctor=self.cleaned_data['doctor']
        user.save()
        return user