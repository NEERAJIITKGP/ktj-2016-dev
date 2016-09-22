# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pref_1', models.IntegerField()),
                ('pref_2', models.IntegerField()),
                ('pref_3', models.IntegerField()),
                ('pref_4', models.IntegerField()),
                ('pref_5', models.IntegerField()),
                ('pref_6', models.IntegerField()),
                ('pref_7', models.IntegerField()),
                ('pref_8', models.IntegerField()),
                ('pref_9', models.IntegerField()),
                ('pref_10', models.IntegerField()),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
