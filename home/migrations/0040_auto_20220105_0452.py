# Generated by Django 3.2.8 on 2022-01-05 04:52

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0023_add_choose_permissions'),
        ('home', '0039_homepage_infographic_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage',
            name='infographic_gallery',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Gallery'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='innovation_highlight1',
            field=wagtail.core.fields.RichTextField(blank=True, default='', null=True, verbose_name='Hightight Text'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='innovation_highlight2',
            field=wagtail.core.fields.RichTextField(blank=True, default='', null=True, verbose_name='Hightight Text'),
        ),
    ]