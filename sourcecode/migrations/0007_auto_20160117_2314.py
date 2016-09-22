# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0006_auto_20160117_2307'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sourcecodeuser',
            name='bid',
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='bid1',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='bid2',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='bid3',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='bid4',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
