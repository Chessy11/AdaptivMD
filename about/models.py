from django.db import models
from wagtail.admin.edit_handlers import (
    FieldPanel,
    RichTextField,
    MultiFieldPanel,
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images import get_image_model_string

from wagtail.core.models import Page


class AboutPage(Page):
  
    class Meta:
        verbose_name = "About Page"


    logo = models.ForeignKey(
            get_image_model_string(),
            null=True,
            blank=True,
            on_delete=models.SET_NULL,
            related_name='+',
            verbose_name = 'Logo'
    )

    page_title = RichTextField(
        verbose_name="Page Title",
        null=True,
        blank=True,
        default=""
    )

    page_text = RichTextField(
        verbose_name="Page Text",
        null=True,
        blank=True,
        default=""
    )

    content_photo = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='photo',
    )

    content_title=RichTextField(
        verbose_name='Content Title',
        null=True,
        blank=True,
        default=""
    )

    content_text=RichTextField(
        verbose_name='Content Text',
        null=True,
        blank=True,
        default=""
    )

    mid_content_title1=RichTextField(
        verbose_name = "Middle Content Title 1", 
        null=True,
        blank=True,
        default=""
    )

    mid_content_title2=RichTextField(
        verbose_name = "Middle Content Title 2", 
        null=True,
        blank=True,
        default=""
    )

    mid_content_text1=RichTextField(
        verbose_name = "Middle Content Text 1",
        null=True,
        blank=True,
        default=""
    )


    mid_content_text2=RichTextField(
        verbose_name = "Middle Content Text 2",
        null=True,
        blank=True,
        default=""
    )


    mid_content_photo1=models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Middle Content Photo 1"
    )


    mid_content_photo2=models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Middle Content Photo 2"
    )

    banner_title=RichTextField(
        verbose_name = "Banner Text",
        null=True,
        blank=True,
        default=""
    )

    banner_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Banner Image"
    )
    

    banner_text=RichTextField(
        verbose_name = "Banner Text",
        null=True,
        blank=True,
        default=""
    )

    bot_content_title = RichTextField(
        verbose_name = "Bottom Content Title",
        null=True,
        blank=True,
        default=""
    )

    bot_content_title_dropdown1 = RichTextField(
        verbose_name="First Dropdown Title",
        null=True,
        blank=True,
        default=""
    )

    bot_content_text_dropdown1 = RichTextField(
        verbose_name="First Dropdown Text",
        null=True,
        blank=True,
        default=""
    )

    bot_content_title_dropdown2 = RichTextField(
        verbose_name="Second Dropdown Title",
        null=True,
        blank=True,
        default=""
    )


    bot_content_text_dropdown2 = RichTextField(
        verbose_name="Second Dropdown Text",
        null=True,
        blank=True,
        default=""
    )




    bot_content_title_dropdown3 = RichTextField(
        verbose_name="Third Dropdown Title",
        null=True,
        blank=True,
        default=""
    )


    bot_content_text_dropdown3 = RichTextField(
        verbose_name="Third Dropdown Text",
        null=True,
        blank=True,
        default=""
    )


    bot_content_title_dropdown4 = RichTextField(
        verbose_name="Fourth Dropdown Title",
        null=True,
        blank=True,
        default=""
    )


    
    bot_content_text_dropdown4 = RichTextField(
        verbose_name="Fourth Dropdown Text",
        null=True,
        blank=True,
        default=""
    )


    bot_content_photo = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Bottom Content Photo"
    )


    director_board_title=RichTextField(
        verbose_name="Director's Board Title",
        null=True,
        blank=True,
        default=""
    )

    first_board_member_photo = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Bottom Content Photo"
    )

    board_member_text1=RichTextField(
        verbose_name = "First Board Member Text",
        null = True,
        blank = True,
        default = ""
    )


    second_board_member_photo = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Second Board Member Photo"
    )

    board_member_text2=RichTextField(
        verbose_name = "Second Board Member Text",
        null = True,
        blank = True,
        default = ""
    )

    
    third_board_member_photo = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Third Board Member Photo"
    )
    board_member_text3=RichTextField(
        verbose_name = "Third Board Member Text",
        null = True,
        blank = True,
        default = ""
    )

    fourth_board_member_photo = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Fourth Board Member Photo"
    )
    board_member_text4=RichTextField(
        verbose_name = "Fourth Board Member Text",
        null = True,
        blank = True,
        default = ""
    )



    content_panels = Page.content_panels + [
        MultiFieldPanel( [
            ImageChooserPanel('logo'),

        ],
        heading = "logo",
        classname="collapsible collapsed"
        ),
        MultiFieldPanel([
            FieldPanel('page_title'),
            FieldPanel('page_text'),
        ],
        heading = 'Page Heading',
        classname="collapsible collapsed"
        ),  
        MultiFieldPanel([
            ImageChooserPanel('content_photo'),
            FieldPanel('content_title'),
            FieldPanel('content_text'),
        ],
        heading = "Top Content",
        classname="collapsible collapsed"
        ),
        MultiFieldPanel([
            FieldPanel('mid_content_title1'),
            FieldPanel('mid_content_text1'),
            FieldPanel('mid_content_title2'),
            FieldPanel('mid_content_text2'),
            ImageChooserPanel('mid_content_photo1'),
            ImageChooserPanel('mid_content_photo2'),
        ],
        heading = "Middle Content",
        classname="collapsible collapsed"
        ),
        MultiFieldPanel([
            ImageChooserPanel('banner_image'),
            FieldPanel('banner_title'),
            FieldPanel('banner_text'),
        ],
        heading = "Banner",
        classname="collapsible collapsed"
        ),
        MultiFieldPanel([
            FieldPanel('bot_content_title'),                                     
            FieldPanel('bot_content_title_dropdown1'),
            FieldPanel('bot_content_text_dropdown1'),
            FieldPanel('bot_content_title_dropdown2'),
            FieldPanel('bot_content_text_dropdown2'),
            FieldPanel('bot_content_title_dropdown3'),
            FieldPanel('bot_content_text_dropdown3'),
            FieldPanel('bot_content_title_dropdown4'),
            FieldPanel('bot_content_text_dropdown4'),
            ImageChooserPanel('bot_content_photo'),

        ],
        heading="Bottom Content",
        classname="collapsible collapsed"
        ),
        MultiFieldPanel([ 
            FieldPanel('director_board_title'),
            ImageChooserPanel('first_board_member_photo'),
            FieldPanel('board_member_text1'),
            ImageChooserPanel('second_board_member_photo'),
            FieldPanel('board_member_text2'),
            ImageChooserPanel('third_board_member_photo'),
            FieldPanel('board_member_text3'),
            ImageChooserPanel('fourth_board_member_photo'),
            FieldPanel('board_member_text4'),

        ],
        heading = 'Directors Board',
        classname="collapsible collapsed"
        )
    ]

    template = "about/about_page.html"