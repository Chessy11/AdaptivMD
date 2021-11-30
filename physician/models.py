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


class FeatureBlock(models.Model):
    CHOICES = (
        ("RIGHT", "Right"),
        ("LEFT", "Left")
    )

    content = RichTextField(
        verbose_name="Feature Description",
        null=True,
        blank=True,
        default=""
    )
    image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Image'
    )
    image_position = models.CharField(
        max_length=5,
        choices=CHOICES,
        default="LEFT"
    )
    panels = [
        FieldPanel('content'),
        ImageChooserPanel('image'),
        FieldPanel('image_position')
    ]

    class Meta:
        abstract = True


class FeatureBlockLinks(Orderable, FeatureBlock):
    page = ParentalKey('physician', on_delete=models.CASCADE, related_name='feature_block')


class ServiceBlock(models.Model):
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


class ServiceBlockLinks(Orderable, ServiceBlock):
    page = ParentalKey('physician', on_delete=models.CASCADE, related_name='service_block')


class DeviceGalleryBlock(models.Model):
    gallery = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Gallery'
    )

    panels = [
        ImageChooserPanel('gallery'),
    ]

    class Meta:
        abstract = True


class DeviceGalleryBlockLinks(Orderable, DeviceGalleryBlock):
    page = ParentalKey('physician', on_delete=models.CASCADE, related_name='devicegallery_block')


class Physician(Page):
    class Meta:
        verbose_name = "physician"

    template = "physician/physician.html"

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

    # Innovation
    innovation_title = CharField(max_length=255, verbose_name="Innovation Title", blank=True)
    innovation_about = RichTextField(
        verbose_name="Details",
        null=True,
        blank=True,
        default=""
    )
    innovation_highlight = RichTextField(
        verbose_name="Summary",
        null=True,
        blank=True,
        default=""
    )
    innovation_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Image'
    )

    # Services
    gallery_title = CharField(max_length=255, verbose_name="Title", blank=True)

    # Features
    feature_title = CharField(max_length=255, verbose_name="Title", blank=True)
    feature_highlight = RichTextField(
        verbose_name="Highlight Text",
        null=True,
        blank=True,
        default=""
    )

    # Video
    video_title = RichTextField(
        verbose_name="Video Title",
        null=True,
        blank=True,
        default=""
    )
    video_url = CharField(max_length=255, verbose_name="Video URL", blank=True)
    video_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Background Image'
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
                FieldPanel('innovation_title'),
                FieldPanel('innovation_about'),
                FieldPanel('innovation_highlight'),
                ImageChooserPanel('innovation_image'),
            ],
            heading='Innovation',
            classname="collapsible collapsed"
        ),
        # MultiFieldPanel(
        #     [
        #         FieldPanel('service_title'),
        #         InlinePanel('service_block', label="Service Block"),
        #     ],
        #     heading='Services',
        #     classname="collapsible collapsed"
        # ),
        MultiFieldPanel(
            [
                FieldPanel('feature_title'),
                FieldPanel('feature_highlight'),
                InlinePanel('feature_block', label="Feature Block"),
            ],
            heading='Features',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('gallery_title'),
                InlinePanel('devicegallery_block', label="Device Gallery Block"),
            ],
            heading='Device Kits',
            classname="collapsible collapsed"
        ),
    ]

