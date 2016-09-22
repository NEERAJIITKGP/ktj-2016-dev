# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myktj', '0007_sankalp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='initiative',
            name='user',
        ),
        migrations.DeleteModel(
            name='Initiative',
        ),
    ]
