# -*- coding: utf-8 -*-

import re

from django.views.generic.base import TemplateView, View

from django.forms.models import model_to_dict
from django.db.models import Q

from django.utils import timezone
from django.utils.log import getLogger

from quicksilver.decorations.set_variable import setTplViewVariable
from quicksilver.utils.ajax_util import AjaxResponse, AjaxRequest
from quicksilver.models import NoteBook, Note


logger = getLogger(__name__)

# Create your views here.
class HomeView(TemplateView):
    template_name = 'quicksilver/home.html'

    @setTplViewVariable("appName", "quicksilver")
    @setTplViewVariable("title", "QuickSilver")
    def get_context_data(self, **kwargs):
        logger.debug("home - get_context_data")
        context = super(HomeView, self).get_context_data(**kwargs)
        return context

# angular template 호출 페이지
class AngularTplView(TemplateView):
    def get_context_data(self, **kwargs):
        self.template_name = "quicksilver/tpl/" + kwargs['page_name'] + ".html"
        return super(AngularTplView, self).get_context_data(**kwargs)

class NotebookListView(View):

    def post(self, request, *args, **kwargs):
        pass

    def get(self, request, *args, **kwargs):
        qs = NoteBook.objects.filter(isDelete=False).order_by('-regDate')

        listData = [model_to_dict(item) for item in list(qs)]
        for notebook in listData:
            notebook['type'] = 'notebook'
            notebook['noteCnt'] = Note.objects.filter(notebook__pk=notebook['id'], isDelete=False).count()

        # Trash 추가한다.
        listData.append({
            'type': 'trash',
            'id': 0,
            'title': 'Trash',
            'isModify': False,
            'noteCnt': Note.objects.filter(isDelete=True).order_by('-regDate').count()
        })

        return AjaxResponse(listData)

    # notebook을 삭제하면 실제 삭제하지 않는다. isDelete flag만 False 로 변경한다.
    # 실제 삭제는 Trash에서 이루어 진다.
    def delete(self, request, *args, **kwargs):
        try:
            model = NoteBook.objects.get(pk=kwargs['notebook_id'])
            model.isDelete = True
            model.deleteDate = timezone.now()
            model.save()
            Note.objects.filter(notebook__pk=kwargs['notebook_id']).update(isDelete=True, deleteDate=timezone.now())
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
        except:
            model = NoteBook()

        model.modifyDate = timezone.now()
        for name in  NoteBook._meta.get_all_field_names():
            if name in data:
                if not (bool(re.search('date', name, flags=re.IGNORECASE)) or bool(re.search('id', name, flags=re.IGNORECASE))):
                    model.__dict__[name] = data[name]

        model.save()
        notes = Note.objects.filter(notebook__pk=model.pk, isDelete=False)

        cvt_model = model_to_dict(model)
        cvt_model['type'] = 'notebook'
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
        qs = Note.objects.filter(isDelete=False).order_by('-modifyDate', '-regDate')[:5]
        return AjaxResponse(qs)


class NoteListView(View):
    def get(self, request, *args, **kwargs):
        notebookType = None

        #notebook
        if 'notebook_id' in kwargs and int(kwargs['notebook_id']) > 0:
            qs = Note.objects.filter(notebook__pk=kwargs['notebook_id'], isDelete=False).order_by('-regDate')
            notebookType = "notebook"
        #search
        elif 'search_text' in kwargs:
            qs = Note.objects\
                .filter(isDelete=False)\
                .filter(Q(title__icontains=kwargs['search_text']) | Q(content__icontains=kwargs['search_text']))\
                .order_by('-regDate')
            notebookType = "search"
        #trash
        else:#Trash List
            qs = Note.objects.filter(isDelete=True).order_by('-deleteDate', '-regDate')
            notebookType = "trash"

        return AjaxResponse(qs, paramDic={'notebookType':notebookType})


class NoteView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.get(pk=kwargs['note_id'])
        return AjaxResponse(qs)

    # 실제로 삭제하지 않는다. isDelete flag만 변경해준다.
    def delete(self, request, *args, **kwargs):
        try:
            note = Note.objects.get(pk=kwargs['note_id'])
            note.isDelete = True
            note.save()
        except:
            pass

        return AjaxResponse()

    def put(self, request, *args, **kwargs):
        ajaxRequest = AjaxRequest(request)
        data = ajaxRequest.getData()

        if bool(data):
            try:
                # 신규
                if int(data['id']) == 0:
                    model = Note()
                else:
                    model = Note.objects.get(pk=data['id'])
            except:
                model = Note()

            model.modifyDate = timezone.now()
            for name in  Note._meta.get_all_field_names():
                if name in data:
                    if not (bool(re.search('date', name, flags=re.IGNORECASE)) or bool(re.search('^id$', name, flags=re.IGNORECASE))):
                        model.__dict__[name] = data[name]

            notebook = NoteBook.objects.get(pk=data['notebook'])
            model.notebook = notebook
            model.save()
            return AjaxResponse(model)
        else:
            return AjaxResponse()
