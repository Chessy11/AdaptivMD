# Generated by Django 3.2.8 on 2021-12-16 10:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0007_auto_20211202_1730'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contactpage',
            name='demo_content',
        ),
        migrations.RemoveField(
            model_name='contactpage',
            name='demo_icon',
        ),
        migrations.RemoveField(
            model_name='contactpage',
            name='demo_image',
        ),
        migrations.RemoveField(
            model_name='contactpage',
            name='demo_title',
        ),
    ]
