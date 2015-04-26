__author__ = 'kdj'
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.query import QuerySet

class AjaxResponse(JsonResponse):
    def __init__(self, data, encoder=DjangoJSONEncoder, safe=True, **kwargs):
        newData = {}
        try:
            if isinstance(data, QuerySet):
                newData['data'] = list(data)
            else:
                newData['data'] = dict(data)

            if hasattr(kwargs, 'message'):
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
