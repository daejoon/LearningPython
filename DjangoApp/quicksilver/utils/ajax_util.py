__author__ = 'kdj'
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.query import QuerySet
from django.db import models
from django.forms.models import model_to_dict
import json

class AjaxResponse(JsonResponse):
    def __init__(self, data={}, encoder=DjangoJSONEncoder, safe=True, **kwargs):
        newData = {}
        try:
            if isinstance(data, QuerySet):
                newData['data'] = [model_to_dict(item) for item in list(data)]
            elif isinstance(data, models.Model):
                newData['data'] = model_to_dict(data)
            else:
                newData['data'] = data

            if 'message' in kwargs:
                newData['message'] = kwargs['message']
            else:
                newData['message'] = ''
        except Exception as e:
            newData['status'] = False
            newData['message'] = e.message
        else:
            newData['status'] = True
        finally:
            super(AjaxResponse, self).__init__(newData, encoder, safe, **kwargs)

class AjaxRequest(object):
    def __init__(self, request):
        self.request = request

    def getData(self):
        return json.loads(self.request.body)['data']

    def getRequest(self):
        return self.request