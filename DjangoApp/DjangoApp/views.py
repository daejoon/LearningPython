from django.views.generic.base import TemplateView
from quicksilver.decorations.set_variable import setTplViewVariable

class HomeView(TemplateView):
    template_name = 'home.html'

    @setTplViewVariable("appName", "Home")
    @setTplViewVariable("title", "AngularJS")
    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        return context

