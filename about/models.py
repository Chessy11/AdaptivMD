from django.db import models
from wagtail.contrib.settings.models import BaseSetting, register_setting
from wagtail.admin.edit_handlers import (
    TextField,
    FieldPanel,
    MultiFieldPanel,
    RichTextField,
    CharField,
    MultiFieldPanel,
    InlinePanel,
)
from wagtail.images import get_image_model_string
from wagtail.images.edit_handlers import ImageChooserPanel
from modelcluster.fields import ParentalKey
from wagtail.core.models import Orderable, Page


class GoalBlock(models.Model):
    title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )
    content = RichTextField(
        verbose_name="Service Description",
        null=True,
        blank=True,
        default=""
    )
    icon = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Icon'
    )

    panels = [
        FieldPanel('title'),
        FieldPanel('content'),
        ImageChooserPanel('icon'),
    ]

    class Meta:
        abstract = True


class GoalBlockLinks(Orderable, GoalBlock):
    page = ParentalKey('AboutPage', on_delete=models.CASCADE, related_name='goal_block')


class AboutPage(Page):
    templates = "about/about_page.html"

    # Slider
    primary_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Primary Image'
    )
    slider_title = CharField(max_length=255, verbose_name="Slider Title", blank=True)
    slider_description = RichTextField(
        verbose_name="Slider Description",
        null=True,
        blank=True,
        default=""
    )

    # Mission & Goals
    mission_title = CharField(max_length=255, verbose_name="Mission & Goals Title", blank=True)
    mission_about = RichTextField(
        verbose_name="Description",
        null=True,
        blank=True,
        default=""
    )
    mission_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Image'
    )

    # Vission
    vision_title = CharField(max_length=255, verbose_name="Title", blank=True)

    vision_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Primary Image'
    )
    vision_icon = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Icon'
    )
    vision_description = RichTextField(
        verbose_name="Description",
        null=True,
        blank=True,
        default=""
    )

    # Contact
    contact_title = CharField(max_length=255, verbose_name="Title", blank=True)
    contact_description = RichTextField(
        verbose_name="Description",
        null=True,
        blank=True,
        default=""
    )
    contact_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Primary Image'
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel('slider_title'),
                FieldPanel('slider_description'),
                ImageChooserPanel('primary_image'),
            ],
            heading='Primary Image',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('mission_title'),
                FieldPanel('mission_about'),
                ImageChooserPanel('mission_image'),
                InlinePanel('goal_block', label="Goals Block"),
            ],
            heading='Mission & Goals',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('vision_title'),
                FieldPanel('vision_description'),
                ImageChooserPanel('vision_icon'),
                ImageChooserPanel('vision_image'),
            ],
            heading='Company Vision',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('contact_title'),
                FieldPanel('contact_description'),
                ImageChooserPanel('contact_image'),
            ],
            heading='Contactus',
            classname="collapsible collapsed"
        ),
    ]