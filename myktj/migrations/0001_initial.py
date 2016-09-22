# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('event', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('department', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='event_reg',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.ForeignKey(to='event.Event')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Institute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('institute', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('dateOfBirth', models.DateField()),
                ('gender', models.CharField(max_length=1, choices=[(b'M', b'Male'), (b'F', b'Female')])),
                ('year', models.IntegerField()),
                ('country', models.CharField(max_length=100)),
                ('contact', models.CharField(max_length=20)),
                ('address', models.TextField()),
                ('regDate', models.DateTimeField()),
                ('department', models.ForeignKey(to='myktj.Department')),
                ('institute', models.ForeignKey(to='myktj.Institute')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('state', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='profile',
            name='state',
            field=models.ForeignKey(to='myktj.State'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='institute',
            name='state',
            field=models.ForeignKey(to='myktj.State'),
            preserve_default=True,
        ),
    ]
