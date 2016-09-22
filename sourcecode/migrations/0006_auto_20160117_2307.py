# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0005_sourcecode_sourcecodeque1_sourcecodeque2_sourcecodeque3_sourcecodeque4_sourcecodeuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='sourcecodeuser',
            name='bid',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecode',
            name='question1',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecode',
            name='question2',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecode',
            name='question3',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='sourcecode',
            name='question4',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
