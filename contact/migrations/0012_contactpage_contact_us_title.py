# Generated by Django 3.2.8 on 2021-12-21 18:41

from django.db import migrations
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0011_remove_contactpage_intro'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactpage',
            name='contact_us_title',
            field=wagtail.core.fields.RichTextField(blank=True),
        ),
    ]
