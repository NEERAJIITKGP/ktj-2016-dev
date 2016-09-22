# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import myktj.models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myktj', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('status', models.IntegerField(choices=[(b'1', b'Pending'), (b'2', b'Accepted')])),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='KolkataWorkshop',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('filetype', models.CharField(max_length=5)),
                ('attempts', models.PositiveIntegerField()),
                ('file', models.FileField(upload_to=myktj.models.upload_directory)),
                ('event', models.ForeignKey(to='event.Event')),
                ('profile', models.ForeignKey(to='myktj.Profile')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.ForeignKey(to='event.Event')),
                ('leader', models.ForeignKey(related_name='leader', to='myktj.Profile')),
                ('members', models.ManyToManyField(related_name='member', to='myktj.Profile')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='submission',
            name='team',
            field=models.ForeignKey(to='myktj.Team'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='invitation',
            name='team',
            field=models.ForeignKey(to='myktj.Team'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='invitation',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
