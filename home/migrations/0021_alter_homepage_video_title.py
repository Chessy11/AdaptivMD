# Generated by Django 3.2.8 on 2021-11-12 15:44

from django.db import migrations
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0020_auto_20211112_1533'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='video_title',
            field=wagtail.core.fields.RichTextField(blank=True, default='', null=True, verbose_name='Video Title'),
        ),
    ]
