# Generated by Django 5.0.6 on 2024-07-01 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BingoNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('default_text', models.TextField()),
                ('gif_url', models.URLField()),
                ('picked', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='BingoCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numbers', models.ManyToManyField(to='bingo.bingonumber')),
            ],
        ),
    ]
