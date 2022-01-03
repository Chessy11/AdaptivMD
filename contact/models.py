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
from wagtail.images import get_image_model_string
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.contrib.forms.models import (
    AbstractEmailForm,
    AbstractFormField
)
from django.core.mail import send_mail, BadHeaderError

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

    #Request DEMO
    # demo_title = models.CharField(
    #     max_length=255,
    #     null=True,
    #     blank=True,
    # )
    #
    # demo_content = RichTextField(
    #     verbose_name="Service Description",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # demo_icon = models.ForeignKey(
    #     get_image_model_string(),
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    #     related_name='+',
    #     verbose_name='Icon'
    # )
    #
    # demo_image = models.ForeignKey(
    #     get_image_model_string(),
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    #     related_name='+',
    #     verbose_name='Primary Image'
    # )

    #Thank you text
    thank_you_text = RichTextField(blank=True)
    contact_us_title = CharField(max_length=255, verbose_name="Title", blank=True)
    contact_us_text = CharField(max_length=255, verbose_name="Contact Us Text", blank=True)
    gallery = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Gallery'
    )
    description_text = RichTextField(blank=True)

    content_panels = AbstractEmailForm.content_panels + [
        InlinePanel('form_fields', label='Form Fields', classname="collapsible collapsed"),
        MultiFieldPanel([
            FieldPanel('thank_you_text'),
            FieldPanel('contact_us_title'),
            FieldPanel('contact_us_text'),
            ImageChooserPanel('gallery'),
            FieldPanel('description_text'),
        ],
            heading="Text Setting",
            classname="collapsible collapsed"),
        MultiFieldPanel([
            FieldRowPanel([
                FieldPanel('from_address', classname="col6"),
                FieldPanel('to_address', classname="col6"),
            ]),
            FieldPanel("subject"),
        ],
            heading="Email Settings",
            classname="collapsible collapsed"),

        # MultiFieldPanel(
        #     [
        #         FieldPanel('demo_title'),
        #         FieldPanel('demo_content'),
        #         ImageChooserPanel('demo_icon'),
        #         ImageChooserPanel('demo_image'),
        #     ],
        #     heading='Request a Demo',
        #     classname="collapsible collapsed"
        # ),
    ]

    def process_form_submission(self, form):
        self.subject = 'New Contact'

        super().process_form_submission(form)



