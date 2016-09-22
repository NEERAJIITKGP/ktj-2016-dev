# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0008_auto_20160118_0052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sourcecodeuser',
            name='last_played',
            field=models.DateTimeField(blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecodeuser',
            name='last_played2',
            field=models.DateTimeField(blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecodeuser',
            name='last_played3',
            field=models.DateTimeField(blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecodeuser',
            name='last_played4',
            field=models.DateTimeField(blank=True),
            preserve_default=True,
        ),
    ]
