# Generated by Django 3.2.8 on 2021-11-26 22:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('physician', '0006_alter_devicegalleryblocklinks_gallery'),
    ]

    operations = [
        migrations.RenameField(
            model_name='physician',
            old_name='service_title',
            new_name='gallery_title',
        ),
    ]
