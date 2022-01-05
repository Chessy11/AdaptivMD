# Generated by Django 3.2.8 on 2021-12-22 09:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0023_add_choose_permissions'),
        ('about', '0003_auto_20211202_0950'),
    ]

    operations = [
        migrations.AddField(
            model_name='aboutpage',
            name='mission_icon',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Icon'),
        ),
    ]