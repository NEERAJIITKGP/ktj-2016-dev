# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0011_auto_20160118_1933'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sourcecodeque1',
            name='user',
        ),
        migrations.DeleteModel(
            name='sourcecodeQue1',
        ),
        migrations.RemoveField(
            model_name='sourcecodeque2',
            name='user',
        ),
        migrations.DeleteModel(
            name='sourcecodeQue2',
        ),
        migrations.RemoveField(
            model_name='sourcecodeque3',
            name='user',
        ),
        migrations.DeleteModel(
            name='sourcecodeQue3',
        ),
        migrations.RemoveField(
            model_name='sourcecodeque4',
            name='user',
        ),
        migrations.DeleteModel(
            name='sourcecodeQue4',
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='bid5',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='bid6',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='clickquestion5',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='clickquestion6',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='question5',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecode',
            name='question6',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='gameover5',
            field=models.IntegerField(default=0, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='gameover6',
            field=models.IntegerField(default=0, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='last_played5',
            field=models.DateTimeField(default=datetime.datetime.now, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='sourcecodeuser',
            name='last_played6',
            field=models.DateTimeField(default=datetime.datetime.now, blank=True),
            preserve_default=True,
        ),
    ]
