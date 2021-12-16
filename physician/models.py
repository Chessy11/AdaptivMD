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
        verbose_name='Icon'
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


class ManagementBlock(models.Model):
    CHOICES = (
        ("RIGHT", "Right"),
        ("LEFT", "Left")
    )

    icon = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Icon'
    )

    title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )
    content = RichTextField(
        verbose_name="Description",
        null=True,
        blank=True,
        default=""
    )

    gallery = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Gallery'
    )

    image_position = models.CharField(
        max_length=5,
        choices=CHOICES,
        default="LEFT"
    )

    panels = [
        ImageChooserPanel('icon'),
        FieldPanel('title'),
        FieldPanel('content'),
        ImageChooserPanel('gallery'),
        FieldPanel('image_position')
    ]

    class Meta:
        abstract = True


class ManagementBlockLinks(Orderable, ManagementBlock):
    page = ParentalKey('physician', on_delete=models.CASCADE, related_name='management_block')


class DeviceGalleryBlock(models.Model):
    title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    gallery = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Gallery'
    )

    device1 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Device1'
    )

    device2 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Device2'
    )

    device3 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Device3'
    )

    device4 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Device4'
    )

    panels = [
        FieldPanel('title'),
        ImageChooserPanel('gallery'),
        ImageChooserPanel('device1'),
        ImageChooserPanel('device2'),
        ImageChooserPanel('device3'),
        ImageChooserPanel('device4'),
    ]

    class Meta:
        abstract = True


class DeviceGalleryBlockLinks(Orderable, DeviceGalleryBlock):
    page = ParentalKey('physician', on_delete=models.CASCADE, related_name='devicegallery_block')


class OutcomeBlock(models.Model):
    content = RichTextField(
        verbose_name="Description",
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
        ImageChooserPanel('icon'),
        FieldPanel('content')
    ]

    class Meta:
        abstract = True


class ServiceBlockLinks(Orderable, OutcomeBlock):
    page = ParentalKey('physician', on_delete=models.CASCADE, related_name='outcome_block')


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

    # Infographic
    infographic_title = CharField(max_length=255, verbose_name="Title", blank=True)

    # Features
    feature_title = CharField(max_length=255, verbose_name="Title", blank=True)
    feature_highlight = RichTextField(
        verbose_name="Highlight Text",
        null=True,
        blank=True,
        default=""
    )
    feature_gallery = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Gallery'
    )

    # Management
    management_title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    #Outcome
    outcome_title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
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
        MultiFieldPanel(
            [
                FieldPanel('feature_title'),
                FieldPanel('feature_highlight'),
                ImageChooserPanel('feature_gallery'),
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
        MultiFieldPanel(
            [
                FieldPanel('infographic_title'),
            ],
            heading='Infographic',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('management_title'),
                InlinePanel('management_block', label="Management Block"),
            ],
            heading='Management',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('outcome_title'),
                InlinePanel('outcome_block', label="Outcome Block"),
            ],
            heading='Outcomes',
            classname="collapsible collapsed"
        ),
    ]

