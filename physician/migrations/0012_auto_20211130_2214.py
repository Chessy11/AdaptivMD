# Generated by Django 3.2.8 on 2021-11-30 22:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0023_add_choose_permissions'),
        ('physician', '0011_managementblocklinks_image_position'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='physician',
            name='management_icon',
        ),
        migrations.AddField(
            model_name='managementblocklinks',
            name='icon',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Icon'),
        ),
        migrations.AddField(
            model_name='physician',
            name='management_title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]