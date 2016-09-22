# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sourcecode', '0004_auto_20160117_0059'),
    ]

    operations = [
        migrations.CreateModel(
            name='sourcecode',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('points', models.IntegerField(default=1000)),
                ('question1', models.IntegerField(blank=True)),
                ('question2', models.IntegerField(blank=True)),
                ('question3', models.IntegerField(blank=True)),
                ('question4', models.IntegerField(blank=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='sourcecodeQue1',
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
        migrations.CreateModel(
            name='sourcecodeQue2',
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
        migrations.CreateModel(
            name='sourcecodeQue3',
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
        migrations.CreateModel(
            name='sourcecodeQue4',
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
