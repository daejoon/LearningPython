__author__ = 'kdj'
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.query import QuerySet
from django.forms.models import model_to_dict

class AjaxResponse(JsonResponse):
    def __init__(self, data, encoder=DjangoJSONEncoder, safe=True, **kwargs):
        newData = {}
        try:
            if isinstance(data, QuerySet):
                newData['data'] = [model_to_dict(item) for item in list(data)]
            else:
                newData['data'] = model_to_dict(data)

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
