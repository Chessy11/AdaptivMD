# Generated by Django 3.2.8 on 2021-11-12 17:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0066_collection_management_permissions'),
        ('home', '0022_alter_serviceblocklinks_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='slider_text2',
            field=models.CharField(blank=True, max_length=255, verbose_name='Slider Text2'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='slider_text3',
            field=models.CharField(blank=True, max_length=255, verbose_name='Slider Text3'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='slider_title2',
            field=models.CharField(blank=True, max_length=255, verbose_name='Slider Tittle2'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='slider_title3',
            field=models.CharField(blank=True, max_length=255, verbose_name='Slider Tittle3'),
        ),
        migrations.CreateModel(
            name='SocialMediaSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facebook', models.URLField(help_text='Your Facebook page URL')),
                ('instagram', models.CharField(help_text='Your Instagram username, without the @', max_length=255)),
                ('trip_advisor', models.URLField(help_text='Your Trip Advisor page URL')),
                ('youtube', models.URLField(help_text='Your YouTube channel or user account URL')),
                ('site', models.OneToOneField(editable=False, on_delete=django.db.models.deletion.CASCADE, to='wagtailcore.site')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
