# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('preference', '0005_auto_20160117_0611'),
    ]

    operations = [
        migrations.AlterField(
            model_name='preference',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 17, 23, 1, 30, 931000)),
            preserve_default=True,
        ),
    ]
