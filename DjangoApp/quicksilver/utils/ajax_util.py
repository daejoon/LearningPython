__author__ = 'kdj'
import json

from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.query import QuerySet
from django.db import models
from django.forms.models import model_to_dict


class AjaxResponse(JsonResponse):
    def __init__(self, data={}, paramDic={}, encoder=DjangoJSONEncoder, safe=True, **kwargs):
        newData = dict()
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
            newData['message'] = str(e)
        else:
            newData['status'] = True
        finally:
            newData = dict(newData.items() + paramDic.items())
            super(AjaxResponse, self).__init__(newData, encoder, safe, **kwargs)

class AjaxRequest(object):
    def __init__(self, request):
        self.request = request

    def getData(self):
        data = json.loads(self.request.body)
        if 'data' in data:
            return data['data']
        else:
            return data

    def getRequest(self):
        return self.request