from allauth.account.forms import SignupForm
from django import forms
from wagtail.users.forms import UserEditForm, UserCreationForm
from phonenumber_field.formfields import PhoneNumberField


class MySignupForm(SignupForm):
    first_name = forms.CharField(max_length=20, widget=forms.TextInput(attrs={'placeholder': 'First Name'}))
    last_name = forms.CharField(max_length=20, widget=forms.TextInput(attrs={'placeholder': 'Last Name'}))
    phone = PhoneNumberField(help_text="example phone +1999999999", widget=forms.TextInput(attrs={'placeholder': 'Phone Number(ex:+1999999999)'}))
    street = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'placeholder': 'Street'}))
    state = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'placeholder': 'State'}))
    city = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'placeholder': 'City'}))
    zipcode = forms.CharField(max_length=10, widget=forms.TextInput(attrs={'placeholder': 'Zip Code'}))

    def save(self, request):
        user = super(MySignupForm, self).save(request)
        user.first_name=self.cleaned_data['first_name']
        user.last_name=self.cleaned_data['last_name']
        user.phone=self.cleaned_data['phone']
        user.state = self.cleaned_data['state']
        user.city = self.cleaned_data['city']
        user.street = self.cleaned_data['street']
        user.zipcode = self.cleaned_data['zipcode']

        user.save()

        return user


class CustomUserEditForm(UserEditForm):
    first_name = forms.CharField(max_length=20, label='First Name')
    last_name = forms.CharField(max_length=20, label='Last Name')
    phone = PhoneNumberField(help_text="example phone +1999999999")
    street = forms.CharField(max_length=50, label="Street")
    state = forms.CharField(max_length=50, label="State")
    city = forms.CharField(max_length=50, label="City")
    zipcode = forms.CharField(max_length=10, label="Zip Code")


class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=20, label='First Name')
    last_name = forms.CharField(max_length=20, label='Last Name')
    phone = PhoneNumberField(help_text="example phone +1999999999")
    street = forms.CharField(max_length=50, label="Street")
    state = forms.CharField(max_length=50, label="State")
    city = forms.CharField(max_length=50, label="City")
    zipcode = forms.CharField(max_length=50, label="Zip Code")