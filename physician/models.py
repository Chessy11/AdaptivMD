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



class Physician(Page):
    
    class Meta:
        verbose_name = "Physician's Page"

    template = "physician/physician.html"


    top_content_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Top Content Photo"
    )

    top_content_title = RichTextField(
        verbose_name="Top Content Title",
        null=True,
        blank=True,
        default=""
    )

    top_content_text = RichTextField(
        verbose_name="Top Content Text",
        null=True,
        blank=True,
        default=""
    )

    middle_content_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Middle Content Photo"
    )

    middle_content_title = RichTextField(
        verbose_name="Middle Content Title",
        null=True,
        blank=True,
        default=""
    )

    middle_content_text = RichTextField(
        verbose_name="Middle Content Text",
        null=True,
        blank=True,
        default=""
    )

    bottom_content_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Bottom Content Photo"
    )


    bottom_content_title = RichTextField(
        verbose_name="Bottom Content Title",
        null=True,
        blank=True,
        default=""
    )

    bottom_content_text = RichTextField(
        verbose_name="Bottom Content Text",
        null=True,
        blank=True,
        default=""
    )

    # Contact Section
    banner_text = RichTextField(
        verbose_name = "Banner Text",
        null=True,
        blank=True,
        default=""
    )
    

    phone_number = RichTextField(
        verbose_name = "Phone Number",
        null=True,
        blank=True,
        default=""
    )

    email_adress = RichTextField(
        verbose_name = "Email Address",
        null=True,
        blank=True,
        default=""
    )


    content_panels = Page.content_panels + [
        MultiFieldPanel([ 
            ImageChooserPanel('top_content_photo'),
            FieldPanel('top_content_title'),
            FieldPanel('top_content_text'),
            ImageChooserPanel('middle_content_photo'),
            FieldPanel('middle_content_title'),
            FieldPanel('middle_content_text'),
            ImageChooserPanel('bottom_content_photo'),
            FieldPanel('bottom_content_title'),
            FieldPanel('bottom_content_text'),
        ],
        heading = "Page Content",
        classname="collapsible collapsed"
        ),
        MultiFieldPanel([ 
            FieldPanel('banner_text'),
            FieldPanel('phone_number'),
            FieldPanel('email_adress'),
        ],
        heading = "Contact Banner",
        classname="collapsible collapsed"
        )
    ]