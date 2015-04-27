# -*- coding: utf-8 -*-

import logging
import re

from django.views.generic.base import TemplateView, View
from django.forms.models import model_to_dict
from django.utils import timezone

from quicksilver.decorations.set_variable import setTplViewVariable
from quicksilver.utils.ajax_util import AjaxResponse, AjaxRequest
from quicksilver.models import NoteBook, Note


logger = logging.getLogger(__name__)

# Create your views here.
class HomeView(TemplateView):
    template_name = 'quicksilver/home.html'

    @setTplViewVariable("appName", "quicksilver")
    @setTplViewVariable("title", "QuickSilver")
    def get_context_data(self, **kwargs):
        logger.info("get_context_data")
        context = super(HomeView, self).get_context_data(**kwargs)
        return context

# angular template 호출 페이지
class AngularTplView(TemplateView):
    def get_context_data(self, **kwargs):
        self.template_name = "quicksilver/tpl/" + kwargs['page_name'] + ".html"
        return super(AngularTplView, self).get_context_data(**kwargs)

class NotebookView(View):

    def post(self, request, *args, **kwargs):
        pass

    def get(self, request, *args, **kwargs):
        qs = NoteBook.objects.filter(isDelete=False).order_by('-regDate')
        listData = [model_to_dict(item) for item in list(qs)]

        for notebook in listData:
            notebook['noteCnt'] = Note.objects.filter(notebook__pk=notebook['id']).count()

        return AjaxResponse(listData)

    # notebook을 삭제하면 실제 삭제하지 않는다. isDelete flag만 False 로 변경한다.
    # 실제 삭제는 Trash에서 이루어 진다.
    def delete(self, request, *args, **kwargs):
        try:
            model = NoteBook.objects.get(pk=kwargs['notebook_id'])
            model.isDelete = True
            model.save()
            Note.objects.filter(notebook__pk=kwargs['notebook_id']).update(isDelete = True, deleteDate=timezone.now())
        except:
           pass

        return AjaxResponse()

    def put(self, request, *args, **kwargs):
        ajaxRequest = AjaxRequest(request)
        data = ajaxRequest.getData()

        try:
            # 신규
            if int(data['id']) == 0:
                model = NoteBook()
            else:
                model = NoteBook.objects.get(pk=data['id'])
                model.modifyDate = timezone.now()
        except:
            model = NoteBook()

        for name in  NoteBook._meta.get_all_field_names():
            if name in data:
                if not (bool(re.search('date', name, flags=re.IGNORECASE)) or bool(re.search('id', name, flags=re.IGNORECASE))):
                    model.__dict__[name] = data[name]

        model.save()
        notes = Note.objects.filter(notebook__pk=model.pk)

        cvt_model = model_to_dict(model)
        cvt_model['noteCnt'] = notes.count()
        return AjaxResponse(cvt_model)


class TrashView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.filter(isDelete=True)
        return AjaxResponse(qs)

    def delete(self, request, *args, **kwargs):
        # 실제 테이블에서 삭제가 이루어진다.
        Note.objects.filter(isDelete=True).delete()
        NoteBook.objects.filter(isDelete=True).delete()
        return AjaxResponse()

class RecentNoteView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.filter(isDelete = False).order_by('-regDate')[:3]
        return AjaxResponse(qs)

class NoteListView(View):
    def get(self, request, *args, **kwargs):
        if int(kwargs['notebook_id']) > 0:
            qs = Note.objects.filter(notebook = kwargs['notebook_id']).order_by('-regDate')
        else:
            qs = Note.objects.filter(isDelete=True).order_by('-deleteDate', '-regDate')

        return AjaxResponse(qs)

class NoteView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.get(pk=kwargs['note_id'])
        return AjaxResponse(qs)

    def delete(self, request, *args, **kwargs):
        try:
            note = Note.objects.get(pk=kwargs['note_id'])
            note.delete()
        except:
            pass

        return AjaxResponse()

    def put(self, request, *args, **kwargs):
        ajaxRequest = AjaxRequest(request)
        data = ajaxRequest.getData()

        try:
            # 신규
            if int(data['id']) == 0:
                model = Note()
            else:
                model = Note.objects.get(pk=data['id'])
                model.modifyDate = timezone.now()
        except:
            model = Note()

        for name in  Note._meta.get_all_field_names():
            if name in data:
                if not (bool(re.search('date', name, flags=re.IGNORECASE)) or bool(re.search('^id$', name, flags=re.IGNORECASE))):
                    model.__dict__[name] = data[name]

        model.save()
        return AjaxResponse(model)
