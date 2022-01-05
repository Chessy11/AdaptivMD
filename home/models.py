from django.db import models
from wagtail.contrib.settings.models import BaseSetting, register_setting
from wagtail.admin.edit_handlers import( 
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


@register_setting
class GeneralSettings(BaseSetting):
    header_title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    footer_title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    copyright = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    facebook = models.URLField(
        null=True,
        blank=True,
        help_text='Your Facebook page URL')

    google = models.URLField(
        null=True,
        blank=True,
        help_text='Your Google+ username')

    twitter = models.URLField(
        null=True,
        blank=True,
        help_text='Your Twitter page URL')

    linkedin = models.URLField(
        null=True,
        blank=True,
        help_text='Your Linkedin page URL')

    youtube = models.URLField(
        null=True,
        blank=True,
        help_text='Your YouTube channel or user account URL')

    #Company Info
    office_address = CharField(max_length=255, verbose_name="Office Address", blank=True)
    factory_address = CharField(max_length=255, blank=True)
    email = CharField(max_length=255, blank=True)
    phone = CharField(max_length=255, blank=True)
    working_hours = CharField(max_length=255, blank=True)

    panels = [
        MultiFieldPanel([
            FieldPanel('header_title'),
            FieldPanel('footer_title'),
            FieldPanel('copyright'),
        ],
            heading="Header, Footer, Copyright Setting",
            classname="collapsible collapsed"
        ),
        MultiFieldPanel([
            FieldPanel('facebook'),
            FieldPanel('google'),
            FieldPanel('twitter'),
            FieldPanel('linkedin'),
            FieldPanel('youtube'),
            ],
            heading="Social Information",
            classname = "collapsible collapsed"
        ),
        MultiFieldPanel([
            FieldPanel('office_address'),
            FieldPanel('factory_address'),
            FieldPanel('email'),
            FieldPanel('phone'),
            FieldPanel('working_hours'),
        ],
            heading="Company Information",
            classname="collapsible collapsed"
        ),
    ]

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
    page = ParentalKey('HomePage', on_delete=models.CASCADE, related_name='feature_block')


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
    page = ParentalKey('HomePage', on_delete=models.CASCADE, related_name='service_block')


class HomePage(Page):
    
    templates = "home/home_page.html"

    #Slider
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

    #Innovation
    innovation_title1 = CharField(max_length=255, verbose_name="Innovation Title", blank=True)
    innovation_about1 = CharField(max_length=255, verbose_name="Innovation About", blank=True)
    innovation_highlight1 = RichTextField(
        verbose_name="Hightight Text",
        null=True,
        blank=True,
        default=""
    )
    innovation_image1 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Image1'
    )

    innovation_title2 = CharField(max_length=255, verbose_name="Innovation Title", blank=True)
    innovation_about2 = CharField(max_length=255, verbose_name="Innovation About", blank=True)
    innovation_highlight2 = RichTextField(
        verbose_name="Hightight Text",
        null=True,
        blank=True,
        default=""
    )
    innovation_image2 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Image2'
    )
    #Services
    service_title = CharField(max_length=255, verbose_name="Title", blank=True)

    #Infographic
    infographic_title = CharField(max_length=255, verbose_name="Title", blank=True)
    infographic_gallery = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Gallery'
    )
    #Features
    feature_title = CharField(max_length=255, verbose_name="Title", blank=True)
    feature_highlight = RichTextField(
        verbose_name="Hightlight Text",
        null=True,
        blank=True,
        default=""
    )


    #Video
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

    #Contact
    contact_title = CharField(max_length=255, verbose_name="Title", blank=True)
    contact_highlight = CharField(max_length=255, verbose_name="Highlight Text", blank=True)
    contact_description = CharField(max_length=255, verbose_name="Description", blank=True)

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel('slider_title'),
                FieldPanel('slider_description'),
                ImageChooserPanel('primary_image'),
            ],
            heading = 'Primary Image',
            classname = "collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('innovation_title1'),
                FieldPanel('innovation_about1'),
                FieldPanel('innovation_highlight1'),
                ImageChooserPanel('innovation_image1'),

                FieldPanel('innovation_title2'),
                FieldPanel('innovation_about2'),
                FieldPanel('innovation_highlight2'),
                ImageChooserPanel('innovation_image2'),
            ],
            heading='Innovation',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('service_title'),
                InlinePanel('service_block', label="Service Block"),
            ],
            heading='Services',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('infographic_title'),
                ImageChooserPanel('infographic_gallery'),
            ],
            heading='Infographic',
            classname="collapsible collapsed"
        ),
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
                FieldPanel('video_title'),
                FieldPanel('video_url'),
                ImageChooserPanel('video_image'),
            ],
            heading='Video',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('contact_title'),
                FieldPanel('contact_highlight'),
                FieldPanel('contact_description'),
            ],
            heading='Contact',
            classname="collapsible collapsed"
        ),
    ]