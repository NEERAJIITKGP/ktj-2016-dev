# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('preference', '0009_auto_20160117_2305'),
    ]

    operations = [
        migrations.AddField(
            model_name='preference',
            name='pref_11',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='preference',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 18, 19, 1, 32, 340000)),
            preserve_default=True,
        ),
    ]
