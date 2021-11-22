# Generated by Django 3.2.8 on 2021-11-12 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0024_auto_20211112_1724'),
    ]

    operations = [
        migrations.AddField(
            model_name='socialmediasettings',
            name='email',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='socialmediasettings',
            name='factory_address',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='socialmediasettings',
            name='office_address',
            field=models.CharField(blank=True, max_length=255, verbose_name='Office Address'),
        ),
        migrations.AddField(
            model_name='socialmediasettings',
            name='phone',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]