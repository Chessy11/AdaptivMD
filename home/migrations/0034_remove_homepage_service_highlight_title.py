# Generated by Django 3.2.8 on 2021-11-26 16:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0033_auto_20211126_1619'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='homepage',
            name='service_highlight_title',
        ),
    ]