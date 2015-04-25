from django.db import models
from django.utils import timezone

# Create your models here.
class NoteBook(models.Model):
    title = models.CharField(max_length=255)
    isDelete = models.BooleanField(default=False)
    regDate = models.DateTimeField(default=timezone.now)
    modifyDate = models.DateTimeField(null=True)
    deleteDate = models.DateTimeField(null=True)

    def __unicode__(self):
        return self.title

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(null=True)
    isDelete = models.BooleanField(default=False)
    regDate = models.DateTimeField(default=timezone.now)
    modifyDate = models.DateTimeField(null=True)
    deleteDate = models.DateTimeField(null=True)
    notebook = models.ForeignKey(NoteBook)

    def __unicode__(self):
        return self.title