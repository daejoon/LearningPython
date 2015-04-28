# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('quicksilver', '0002_auto_20150425_1020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='modifyDate',
            field=models.DateTimeField(default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='notebook',
            name='modifyDate',
            field=models.DateTimeField(default=django.utils.timezone.now, null=True),
        ),
    ]
