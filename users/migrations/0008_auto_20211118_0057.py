# Generated by Django 3.2.8 on 2021-11-18 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_user_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='city',
            field=models.CharField(max_length=50, verbose_name='city'),
        ),
        migrations.AlterField(
            model_name='user',
            name='country',
            field=models.CharField(max_length=40, verbose_name='country'),
        ),
        migrations.AlterField(
            model_name='user',
            name='state',
            field=models.CharField(max_length=50, verbose_name='state'),
        ),
        migrations.AlterField(
            model_name='user',
            name='street',
            field=models.CharField(max_length=50, verbose_name='street'),
        ),
    ]