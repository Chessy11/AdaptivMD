# Generated by Django 3.2.8 on 2021-11-19 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_user_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='country',
        ),
        migrations.AddField(
            model_name='user',
            name='zipcode',
            field=models.CharField(default='', max_length=10, verbose_name='zipcode'),
        ),
    ]