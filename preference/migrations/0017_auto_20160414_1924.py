# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('preference', '0016_merge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='preference',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2016, 4, 14, 19, 24, 1, 664000)),
        ),
    ]
