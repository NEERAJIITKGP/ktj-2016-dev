# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sourcecode', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sourcecode',
            name='user',
        ),
        migrations.DeleteModel(
            name='sourcecode',
        ),
        migrations.RemoveField(
            model_name='sourcecodeuser',
            name='user',
        ),
        migrations.DeleteModel(
            name='sourcecodeUser',
        ),
    ]
