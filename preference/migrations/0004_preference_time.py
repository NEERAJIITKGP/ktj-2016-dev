# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('preference', '0003_auto_20160117_0327'),
    ]

    operations = [
        migrations.AddField(
            model_name='preference',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 17, 3, 49, 0, 190000)),
            preserve_default=True,
        ),
    ]
