# Generated by Django 3.2.8 on 2021-11-26 20:24

from django.db import migrations, models
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0036_featureblocklinks'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage',
            name='slider_description',
            field=wagtail.core.fields.RichTextField(blank=True, default='', null=True, verbose_name='Slider Description'),
        ),
        migrations.AddField(
            model_name='homepage',
            name='slider_title',
            field=models.CharField(blank=True, max_length=255, verbose_name='Slider Title'),
        ),
        migrations.AlterField(
            model_name='featureblocklinks',
            name='content',
            field=wagtail.core.fields.RichTextField(blank=True, default='', null=True, verbose_name='Feature Description'),
        ),
    ]
