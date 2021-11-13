from django.db import models
from django import forms
from modelcluster.fields import ParentalKey
from wagtail.admin.edit_handlers import (
    FieldPanel,
    FieldRowPanel,
    InlinePanel,
    MultiFieldPanel,
    RichTextField,
    CharField,
)
from wagtail.contrib.forms.forms import FormBuilder
from wagtail.core.fields import RichTextField
from wagtail.contrib.forms.models import (
    AbstractEmailForm,
    AbstractFormField
)


class FormField(AbstractFormField):
    page = ParentalKey(
        'ContactPage',
        on_delete=models.CASCADE,
        related_name='form_fields',
    )

    # add custom fields to FormField model
    field_classname = CharField("Field classes", max_length=254, blank=True)
    placeholder = CharField("Placeholder", max_length=254, blank=True)

    panels = AbstractFormField.panels + [
        FieldPanel("field_classname"),
        FieldPanel("placeholder"),
    ]


class CustomFormBuilder(FormBuilder):
    def get_create_field_function(self, type):
        create_field_function = super().get_create_field_function(type)

        def wrapped_create_field_function(field, options):

            created_field = create_field_function(field, options)
            created_field.widget.attrs.update(
                {"class": field.field_classname, "placeholder": field.placeholder},
            )

            return created_field

        return wrapped_create_field_function


class ContactPage(AbstractEmailForm):
    form_builder = CustomFormBuilder

    template = "contact/contact_page.html"
    landing_page_template = "contact/contact_page_landing.html"

    #Contact Form Title
    intro = RichTextField(blank=True)

    #Thank you text
    thank_you_text = RichTextField(blank=True)

    content_panels = AbstractEmailForm.content_panels + [
        FieldPanel('intro'),
        InlinePanel('form_fields', label='Form Fields'),
        FieldPanel('thank_you_text'),
        MultiFieldPanel([
            FieldRowPanel([
                FieldPanel('from_address', classname="col6"),
                FieldPanel('to_address', classname="col6"),
            ]),
            FieldPanel("subject"),
        ], heading="Email Settings"),
    ]

