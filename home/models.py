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

    primary_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Primary Image'
    )

    #Innovation
    innovation_title = CharField(max_length=255, verbose_name="Innovation Title", blank=True)
    innovation_about = CharField(max_length=255, verbose_name="Innovation About", blank=True)
    innovation_highlight = RichTextField(
        verbose_name="Hightlight Text",
        null=True,
        blank=True,
        default=""
    )
    innovation_description = RichTextField(
        verbose_name="Description",
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
    innovation_image2 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Image2'
    )

    #Features
    feature_title = CharField(max_length=255, verbose_name="Title", blank=True)
    feature_about = CharField(max_length=255, verbose_name="About", blank=True)
    feature_highlight = RichTextField(
        verbose_name="Hightlight Text",
        null=True,
        blank=True,
        default=""
    )
    feature_description = RichTextField(
        verbose_name="Description",
        null=True,
        blank=True,
        default=""
    )
    feature_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Feature Image'
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

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                ImageChooserPanel('primary_image'),
            ],
            heading = 'Primary Image',
            classname = "collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('innovation_title'),
                FieldPanel('innovation_about'),
                FieldPanel('innovation_highlight'),
                FieldPanel('innovation_description'),
                ImageChooserPanel('innovation_image1'),
                ImageChooserPanel('innovation_image2'),
            ],
            heading='Innovation',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                InlinePanel('service_block', label="Service Block"),
            ],
            heading='Services',
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
                FieldPanel('feature_title'),
                FieldPanel('feature_about'),
                FieldPanel('feature_highlight'),
                FieldPanel('feature_description'),
                ImageChooserPanel('feature_image'),
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
    ]