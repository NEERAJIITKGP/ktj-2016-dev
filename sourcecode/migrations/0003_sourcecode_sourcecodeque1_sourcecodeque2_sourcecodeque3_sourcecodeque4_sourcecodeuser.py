# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sourcecode', '0002_auto_20160116_2301'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sourcecode',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('points', models.IntegerField(default=1000)),
                ('question1', models.IntegerField()),
                ('question2', models.IntegerField()),
                ('question3', models.IntegerField()),
                ('question4', models.IntegerField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SourcecodeQue1',
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
            name='SourcecodeQue2',
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
            name='SourcecodeQue3',
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
            name='SourcecodeQue4',
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
            name='SourcecodeUser',
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
