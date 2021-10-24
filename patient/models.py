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



class Patient(Page):
    
    class Meta:
        verbose_name = "Patient's Page"

    template = "patient/patient.html"


    #Title and Text

    page_title = RichTextField(
        verbose_name="Title",
        null=True,
        blank=True,
        default=""
    )


    page_text = RichTextField(
        verbose_name="Text",
        null=True,
        blank=True,
        default=""
    )

    #Cards

    first_card_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="First Card Photo"
    )

    first_card_title = RichTextField(
        verbose_name="First Card Title",
        null=True,
        blank=True,
        default=""
    )

    first_card_text = RichTextField(
        verbose_name="First Card Text",
        null=True,
        blank=True,
        default=""
    )

    second_card_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Second Card Photo"
    )

    second_card_title = RichTextField(
        verbose_name="Second Card Title",
        null=True,
        blank=True,
        default=""
    )

    second_card_text = RichTextField(
        verbose_name="Second Card Text",
        null=True,
        blank=True,
        default=""
    )

    third_card_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Third Card Photo"
    )


    third_card_title = RichTextField(
        verbose_name="Third Card Title",
        null=True,
        blank=True,
        default=""
    )

    third_card_text = RichTextField(
        verbose_name="Third Card Text",
        null=True,
        blank=True,
        default=""
    )

    fourth_card_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Fourth Card Photo"
    )


    fourth_card_title = RichTextField(
        verbose_name="Fourth Card Title",
        null=True,
        blank=True,
        default=""
    )

    fourth_card_text = RichTextField(
        verbose_name="Fourth Card Text",
        null=True,
        blank=True,
        default=""
    )

    fifth_card_photo = models.ForeignKey(   
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Fifth Card Photo"
    )

    fifth_card_title = RichTextField(
        verbose_name="Fifth Card Title",
        null=True,
        blank=True,
        default=""
    )

    fifth_card_text = RichTextField(
        verbose_name="Fifth Card Text",
        null=True,
        blank=True,
        default=""
    )
    


    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('page_title'),
            FieldPanel('page_text'),
        ],
        heading='Main Left Section',
        classname="collapsible collapsed"
        ),
        MultiFieldPanel([ 
            ImageChooserPanel('first_card_photo'),
            FieldPanel('first_card_title'),
            FieldPanel('first_card_text'),
            ImageChooserPanel('second_card_photo'),
            FieldPanel('second_card_title'),
            FieldPanel('second_card_text'),
            ImageChooserPanel('third_card_photo'),
            FieldPanel('third_card_title'),
            FieldPanel('third_card_text'),
            ImageChooserPanel('fourth_card_photo'),
            FieldPanel('fourth_card_title'),
            FieldPanel('fourth_card_text'),
            ImageChooserPanel('fifth_card_photo'),
            FieldPanel('fifth_card_title'),
            FieldPanel('fifth_card_text'),
        ],
        heading = 'Cards',
        classname="collapsible collapsed"
        )
    ]
        
