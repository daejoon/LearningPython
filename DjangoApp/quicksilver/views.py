# -*- coding: utf-8 -*-

from django.views.generic.base import TemplateView, View
from quicksilver.decorations.set_variable import setTplViewVariable
from quicksilver.utils.ajax_util import AjaxResponse
from quicksilver.models import NoteBook, Note
import logging
import json

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
    def get(self, request, *args, **kwargs):
        res = AjaxResponse(NoteBook.objects.all())
        return res

    def post(self, request, *args, **kwargs):
        pass

    def put(self, request, *args, **kwargs):
        data = json.loads(request.body)['data']

        try:
            model = NoteBook.objects.get(pk=data['id'])
        except:
            model = NoteBook()

        for name in  NoteBook._meta.get_all_field_names():
            if name in data:
                model.__dict__[name] = data[name]

        model.save()
        return AjaxResponse(model)


class TrashView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.filter(isDelete = True)
        return AjaxResponse(qs)

class RecentNoteView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.filter(isDelete = False).order_by('regDate').reverse()
        return AjaxResponse(qs)

class NoteListView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.filter(notebook = kwargs['notebook_id']).order_by('regDate').reverse()
        return AjaxResponse(qs)

class NoteView(View):
    def get(self, request, *args, **kwargs):
        qs = Note.objects.get(pk=kwargs['note_id'])
        return AjaxResponse(qs)
