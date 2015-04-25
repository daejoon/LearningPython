# -*- coding: utf-8 -*-

from django.views.generic.base import TemplateView
from quicksilver.decorations.set_variable import setTplViewVariable
import logging

logger = logging.getLogger(__name__)

# Create your views here.
class HomeView(TemplateView):
    template_name = 'quicksilver/home.html'

    @setTplViewVariable("appName", "Home")
    @setTplViewVariable("title", "QuickSilver")
    def get_context_data(self, **kwargs):
        logger.info("get_context_data")
        context = super(HomeView, self).get_context_data(**kwargs)
        return context

