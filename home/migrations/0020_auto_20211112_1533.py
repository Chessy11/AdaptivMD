# Generated by Django 3.2.8 on 2021-11-12 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0019_auto_20211112_1531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='video_title',
            field=models.CharField(blank=True, max_length=255, verbose_name='Video Title'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='video_url',
            field=models.CharField(blank=True, max_length=255, verbose_name='Video URL'),
        ),
    ]
