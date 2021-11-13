from django.db import models
from django_extensions.db.fields import AutoSlugField
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from wagtail.admin.edit_handlers import (
    MultiFieldPanel,
    InlinePanel,
    FieldPanel,
    PageChooserPanel,
)
from wagtail.images import get_image_model_string
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.models import Orderable
from wagtail.snippets.models import register_snippet


class MenuItem(Orderable):
    link_title = models.CharField(
        blank=True,
        null=True, 
        max_length=50
    )

    link_url = models.CharField(
        max_length=500,
        blank=True,
    )

    link_page = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.CASCADE,
    )
    open_in_new_tab = models.BooleanField(default=False, blank=True)

    page = ParentalKey("Menu", related_name="menu_items")
    
    panels = [
        FieldPanel("link_title"),
        FieldPanel("link_url"),
        PageChooserPanel("link_page"),
        FieldPanel("open_in_new_tab"),
    ]

    @property
    def link(self):
        if self.link_page:
            return self.link_page.url
        elif self.link_url:
            return self.link_url
        return '#'


    @property
    def title(self):
        if self.link_page and not self.link_title:
            return self.link_page_title
        elif self.link_title:
            return self.link_title
        return  "Missing Title"


@register_snippet
class Menu(ClusterableModel):
    title = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from="title", editable=True)
    nav_logo = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Nav Logo"
    )

    link_page_logo = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.CASCADE,
    )

    panels = [
        MultiFieldPanel([
            ImageChooserPanel("nav_logo"),
            PageChooserPanel("link_page_logo"),
            FieldPanel("title"),
            FieldPanel("slug")
        ],
            heading="Menu",
            classname="collapsible collapsed"
        ),
        InlinePanel("menu_items", label="Menu Item", classname="collapsible collapsed")
    ]

    def __str__(self):
        return self.title
