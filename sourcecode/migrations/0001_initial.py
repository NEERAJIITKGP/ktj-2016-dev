# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='sourcecode',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('answer1', models.TextField()),
                ('answer2', models.TextField()),
                ('answer3', models.TextField()),
                ('answer4', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='sourcecodeUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('last_played', models.DateTimeField()),
                ('gameover', models.IntegerField(default=0, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, unique=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
