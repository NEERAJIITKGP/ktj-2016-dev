# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('preference', '0025_auto_20160918_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='preference',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2016, 9, 18, 18, 22, 17, 190000)),
        ),
    ]
