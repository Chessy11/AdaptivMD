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

    #Slider
    slider_title1 = CharField(max_length=255, verbose_name="Slider Tittle1", blank=True)
    slider_text1 = CharField(max_length=255, verbose_name="Slider Text1", blank=True)
    slider_description1 = CharField(max_length=255, verbose_name="Slider Description1", blank=True)
    slider_image1 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Slider Image1'
    )

    slider_title2 = CharField(max_length=255, verbose_name="Slider Tittle2", blank=True)
    slider_text2 = CharField(max_length=255, verbose_name="Slider Text2", blank=True)
    slider_description2 = CharField(max_length=255, verbose_name="Slider Description2", blank=True)
    slider_image2 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Slider Image2'
    )

    slider_title3 = CharField(max_length=255, verbose_name="Slider Tittle3", blank=True)
    slider_text3 = CharField(max_length=255, verbose_name="Slider Text3", blank=True)
    slider_description3 = CharField(max_length=255, verbose_name="Slider Description3", blank=True)
    slider_image3 = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Slider Image3'
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
        MultiFieldPanel([
            MultiFieldPanel(
                [
                    FieldPanel('slider_title1'),
                    FieldPanel('slider_text1'),
                    FieldPanel('slider_description1'),
                    FieldPanel('slider_description1'),
                    ImageChooserPanel('slider_image1'),
                ],
                heading='Slider1',
                classname="collapsible collapsed"
            ),
            MultiFieldPanel(
                [
                    FieldPanel('slider_title2'),
                    FieldPanel('slider_text2'),
                    FieldPanel('slider_description2'),
                    ImageChooserPanel('slider_image2'),
                ],
                heading='Slider2',
                classname="collapsible collapsed"
            ),
            MultiFieldPanel(
                [
                    FieldPanel('slider_title3'),
                    FieldPanel('slider_text3'),
                    FieldPanel('slider_description3'),
                    ImageChooserPanel('slider_image3'),
                ],
                heading='Slider3',
                classname="collapsible collapsed"
            )],
            heading = 'Slider',
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
    # banner_text = RichTextField(
    #     verbose_name = "Hero Title",
    #     null = True,
    #     blank = True,
    #     default = ""
    # )
    #
    # secondary_text = RichTextField(
    #     verbose_name = "Hero Text",
    #     null = True,
    #     blank = True,
    #     default = ""
    # )
    #
    # photo = models.ForeignKey(
    #     get_image_model_string(),
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    #     related_name='+',
    #     verbose_name='Hero Photo',
    # )
    #
    #
    #
    # content_title = RichTextField(
    #     verbose_name="Content Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # content_p = RichTextField(
    #     verbose_name="Content Secondary Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # content_text = RichTextField(
    #     verbose_name="Content Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # content_photo1 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Content Photo1'
    # )
    #
    # content_photo2 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Content Photo2'
    #     )
    #
    #
    #
    #     # Card
    #
    # card_photo1 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Card Photo 1'
    #     )
    #
    #
    # first_card_title = RichTextField(
    #     verbose_name="First Card Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # card_photo2 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Card Photo 2'
    #     )
    #
    # second_card_title = RichTextField(
    #     verbose_name="Second Card Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # card_photo3 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Card Photo 3'
    #     )
    #
    # third_card_title = RichTextField(
    #     verbose_name="Third Card Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # card_photo4 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Card Photo 4'
    #     )
    #
    #
    # fourth_card_title = RichTextField(
    #     verbose_name="Fourth Card Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # first_card_text = RichTextField(
    #     verbose_name="First Card Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # second_card_text = RichTextField(
    #     verbose_name="Second Card Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # third_card_text = RichTextField(
    #     verbose_name="Third Card Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    #
    # fourth_card_text = RichTextField(
    #     verbose_name="Fourth Card Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    #
    #
    #
    #             #Bottom Content
    #
    # bcontent_title = RichTextField(
    #     verbose_name="Bottom Content Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    #
    # bcontent_text = RichTextField(
    #     verbose_name="Bottom Content Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # founder_text = RichTextField(
    #     verbose_name="Founder",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # bcontent_signature = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Signature Image'
    # )
    #
    #
    # bcontent_photo = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Bottom Content Photo'
    # )
    #
    #
    # res_list1 = TextField(
    #     verbose_name = "Responsibilities List 1",
    #     null =True,
    #     blank=True,
    #     default=""
    # )
    #
    #
    # res_list2 = TextField(
    #     verbose_name = "Responsibilities List 2",
    #     null =True,
    #     blank=True,
    #     default=""
    # )
    #
    #
    # res_list3 = TextField(
    #     verbose_name = "Responsibilities List 3",
    #     null =True,
    #     blank=True,
    #     default=""
    # )
    #
    # res_list4 = TextField(
    #     verbose_name = "Responsibilities List 4",
    #     null =True,
    #     blank=True,
    #     default=""
    # )
    #
    # res_list5 = TextField(
    #     verbose_name = "Responsibilities List 5",
    #     null =True,
    #     blank=True,
    #     default=""
    # )
    #
    # res_list6 = TextField(
    #     verbose_name = "Responsibilities List 6",
    #     null =True,
    #     blank=True,
    #     default=""
    # )
    #
    #         #Owl
    #
    # owl_title = RichTextField(
    #     verbose_name="Owl Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # owl_text = RichTextField(
    #     verbose_name="Owl Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # owl_photo1 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Owl Photo1'
    # )
    #
    # content_title1 = RichTextField(
    #     verbose_name = "First Owl Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # content_text1 = RichTextField(
    #     verbose_name = "First Owl Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # owl_photo2 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Owl Photo2'
    # )
    #
    # content_title2 = RichTextField(
    #     verbose_name = "Second Owl Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # content_text2 = RichTextField(
    #     verbose_name = "Second Owl Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # owl_photo3 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Owl Photo3'
    # )
    #
    # content_title3 = RichTextField(
    #     verbose_name = "Third Owl Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # content_text3 = RichTextField(
    #     verbose_name = "Third Owl Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # owl_photo4 = models.ForeignKey(
    #         get_image_model_string(),
    #         null=True,
    #         blank=True,
    #         on_delete=models.SET_NULL,
    #         related_name='+',
    #         verbose_name = 'Owl Photo4'
    # )
    #
    # content_title4 = RichTextField(
    #     verbose_name = "Fourth Owl Title",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # content_text4 = RichTextField(
    #     verbose_name = "Fourth Owl Text",
    #     null=True,
    #     blank=True,
    #     default=""
    # )
    #
    # # Quote
    #
    # quote_photo = models.ForeignKey(
    #     get_image_model_string(),
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    #     related_name='+',
    #     verbose_name="Quote Photo"
    # )
    #
    #
    # quote_title = RichTextField(
    #     verbose_name = "Quote Title",
    #     null = True,
    #     blank = True,
    #     default= ""
    # )
    #
    # quote_text = RichTextField(
    #     verbose_name = "Qoute Text",
    #     null = True,
    #     blank = True,
    #     default = ""
    # )
    #
    # skill_photo = models.ForeignKey(
    #     get_image_model_string(),
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    #     related_name='+',
    #     verbose_name="Skills Section Background  Photo"
    # )
    #
    # skill_title=RichTextField(
    #     verbose_name = "Skill Title",
    #     null = True,
    #     blank = True,
    #     default = ""
    # )
    #
    # skill1=RichTextField(
    #     verbose_name = "First Skill",
    #     null = True,
    #     blank = True,
    #     default = ""
    # )
    #
    #
    # skill2=RichTextField(
    #     verbose_name = "Second Skill",
    #     null = True,
    #     blank = True,
    #     default = ""
    # )
    #
    #
    # skill3=RichTextField(
    #     verbose_name = "Third Skill",
    #     null = True,
    #     blank = True,
    #     default = ""
    # )
    #
    #
    #
    #
    # embed_video = RichTextField(
    #     verbose_name = "Insert URL",
    #     null = True,
    #     blank = True,
    #     default= ""
    #
    # )
    #
    #             #CONTENT_BODY
    #
    # content_panels = Page.content_panels + [
    #
    #     MultiFieldPanel(
    #         [
    #     ImageChooserPanel("photo"),
    #     FieldPanel("banner_text"),
    #     FieldPanel("secondary_text"),
    #
    #
    # ],
    # heading='Hero Block',
    # classname="collapsible collapsed"
    #
    #
    #
    # ),
    #
    #
    #
    #     MultiFieldPanel(
    #         [
    #     FieldPanel('content_title'),
    #     FieldPanel('content_p'),
    #     FieldPanel('content_text'),
    #     ImageChooserPanel('content_photo1'),
    #     ImageChooserPanel('content_photo2'),
    # ],
    #     heading = 'Content',
    #     classname="collapsible collapsed"
    #
    # ),
    #
    # MultiFieldPanel([
    #     ImageChooserPanel('card_photo1'),
    #     FieldPanel('first_card_title'),
    #     FieldPanel('first_card_text'),
    #     ImageChooserPanel('card_photo2'),
    #     FieldPanel('second_card_title'),
    #     FieldPanel('second_card_text'),
    #     ImageChooserPanel('card_photo3'),
    #     FieldPanel('third_card_title'),
    #     FieldPanel('third_card_text'),
    #     ImageChooserPanel('card_photo4'),
    #     FieldPanel('fourth_card_title'),
    #     FieldPanel('fourth_card_text'),
    #
    #
    # ],
    #     heading = "Cards",
    #     classname="collapsible collapsed"
    # ),
    #
    #     MultiFieldPanel(
    #         [
    #          ImageChooserPanel('bcontent_photo'),
    #          ImageChooserPanel("bcontent_signature"),
    #          FieldPanel('bcontent_title'),
    #          FieldPanel('bcontent_text'),
    #          FieldPanel('founder_text'),
    #          FieldPanel('res_list1'),
    #          FieldPanel('res_list2'),
    #          FieldPanel('res_list3'),
    #          FieldPanel('res_list4'),
    #          FieldPanel('res_list5'),
    #          FieldPanel('res_list6'),
    #
    #         ],
    #         heading = "Bottom Content Block",
    #         classname="collapsible collapsed"
    #     ),
    #     MultiFieldPanel(
    #         [
    #             FieldPanel('owl_title'),
    #             FieldPanel('owl_text'),
    #             ImageChooserPanel('owl_photo1'),
    #             FieldPanel('content_title1'),
    #             FieldPanel('content_text1'),
    #             ImageChooserPanel('owl_photo2'),
    #             FieldPanel('content_title2'),
    #             FieldPanel('content_text2'),
    #             ImageChooserPanel('owl_photo3'),
    #             FieldPanel('content_title3'),
    #             FieldPanel('content_text3'),
    #             ImageChooserPanel('owl_photo4'),
    #             FieldPanel('content_title4'),
    #             FieldPanel('content_text4'),
    #         ],
    #         heading='Owl Section',
    #         classname="collapsible collapsed"
    #     ),
    #         MultiFieldPanel([
    #             ImageChooserPanel('quote_photo'),
    #             FieldPanel('quote_title'),
    #             FieldPanel('quote_text'),
    #         ],
    #         heading = "Banner Quote",
    #         classname="collapsible collapsed"
    #         ),
    #
    #     MultiFieldPanel([
    #         ImageChooserPanel('skill_photo'),
    #         FieldPanel('skill_title'),
    #         FieldPanel('skill1'),
    #         FieldPanel('skill2'),
    #         FieldPanel('skill3'),
    #         FieldPanel('embed_video'),
    #     ],
    #     heading = "Video URL",
    #     classname="collapsible collapsed"
    #     )
    # ]