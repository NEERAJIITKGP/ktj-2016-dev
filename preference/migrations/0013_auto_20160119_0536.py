# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('preference', '0012_auto_20160118_2023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='preference',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 19, 5, 36, 12, 497070)),
            preserve_default=True,
        ),
    ]
