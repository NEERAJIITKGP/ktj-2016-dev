# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0007_auto_20160117_2314'),
    ]

    operations = [
        migrations.AddField(
            model_name='sourcecodeuser',
            name='gameover2',
            field=models.IntegerField(default=0, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='gameover3',
            field=models.IntegerField(default=0, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='gameover4',
            field=models.IntegerField(default=0, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='last_played2',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 17, 19, 21, 43, 615000, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='last_played3',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 17, 19, 22, 1, 632000, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='last_played4',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 17, 19, 22, 5, 760000, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
