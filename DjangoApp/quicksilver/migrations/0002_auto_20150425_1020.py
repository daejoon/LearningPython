# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quicksilver', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='deleteDate',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='notebook',
            name='deleteDate',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='modifyDate',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='notebook',
            name='modifyDate',
            field=models.DateTimeField(null=True),
        ),
    ]
