# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0003_sourcecode_sourcecodeque1_sourcecodeque2_sourcecodeque3_sourcecodeque4_sourcecodeuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sourcecode',
            name='user',
        ),
        migrations.DeleteModel(
            name='Sourcecode',
        ),
        migrations.RemoveField(
            model_name='sourcecodeque1',
            name='user',
        ),
        migrations.DeleteModel(
            name='SourcecodeQue1',
        ),
        migrations.RemoveField(
            model_name='sourcecodeque2',
            name='user',
        ),
        migrations.DeleteModel(
            name='SourcecodeQue2',
        ),
        migrations.RemoveField(
            model_name='sourcecodeque3',
            name='user',
        ),
        migrations.DeleteModel(
            name='SourcecodeQue3',
        ),
        migrations.RemoveField(
            model_name='sourcecodeque4',
            name='user',
        ),
        migrations.DeleteModel(
            name='SourcecodeQue4',
        ),
        migrations.RemoveField(
            model_name='sourcecodeuser',
            name='user',
        ),
        migrations.DeleteModel(
            name='SourcecodeUser',
        ),
    ]
