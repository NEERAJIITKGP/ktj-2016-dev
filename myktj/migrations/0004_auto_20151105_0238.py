# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myktj', '0003_socialinitiative'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='socialinitiative',
            name='user',
        ),
        migrations.DeleteModel(
            name='Socialinitiative',
        ),
    ]
