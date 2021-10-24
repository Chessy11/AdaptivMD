from django.db import models
from wagtail.admin.edit_handlers import( 
    FieldPanel, 
    MultiFieldPanel, 
    RichTextField,
    MultiFieldPanel
    )
from wagtail.images import get_image_model_string
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.models import Page






class Contact(Page):
    
    class Meta:
        verbose_name = "Contact Page"

    



    template = "contact/contact.html"

    left_block_title = RichTextField(
        verbose_name="Contact's Title",
        null = True,
        blank=True,
        default="",

    )

    left_block_text = RichTextField(
        verbose_name="Contact's Text",
        null = True,
        blank=True,
        default="",

    )

    office_address = RichTextField(
        verbose_name="Office Address",
        null = True,
        blank=True,
        default="",
    )

    factory_address = RichTextField(
        verbose_name="Factory Address",
        null = True,
        blank=True,
        default="",
    )

    email_address = RichTextField(
        verbose_name="Email Address",
        null = True,
        blank=True,
        default="",
    )

    phone_number_c = RichTextField(
        verbose_name="Phone Number",
        null = True,
        blank=True,
        default="",
    )


            #Form

    form_title = RichTextField(
        verbose_name="Form Title",
        null = True,
        blank=True,
        default="",
    )
    

    content_panels = Page.content_panels +  [
        MultiFieldPanel(
            [
        FieldPanel("left_block_title"),
        FieldPanel("left_block_text"),
        FieldPanel("office_address"),
        FieldPanel("factory_address"),
        FieldPanel("email_address"),
        FieldPanel("phone_number_c"),

    
    ],
    heading="Contact's Left Block",
    classname="collapsible collapsed"

    ),
    MultiFieldPanel(
        [
            FieldPanel("form_title"),
        ],
        heading = "Contact Form",
        classname="collapsible collapsed"
    )

    ]

