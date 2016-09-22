# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0010_auto_20160118_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='sourcecode',
            name='clickquestion1',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='clickquestion2',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='clickquestion3',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='clickquestion4',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecode',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, unique=True),
            preserve_default=True,
        ),
    ]
