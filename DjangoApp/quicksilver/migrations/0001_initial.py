# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField(null=True)),
                ('isDelete', models.BooleanField(default=False)),
                ('regDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('modifyDate', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='NoteBook',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255)),
                ('isDelete', models.BooleanField(default=False)),
                ('regDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('modifyDate', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.AddField(
            model_name='note',
            name='notebook',
            field=models.ForeignKey(to='quicksilver.NoteBook'),
        ),
    ]
