# Generated by Django 2.2.1 on 2019-05-30 08:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('middle_name', models.CharField(blank=True, max_length=50)),
                ('date_of_birth', models.DateField()),
                ('display_image_url', models.URLField(blank=True, max_length=400)),
                ('about', models.TextField(blank=True)),
                ('contact_number', models.DecimalField(decimal_places=0, max_digits=10)),
                ('address', models.TextField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
