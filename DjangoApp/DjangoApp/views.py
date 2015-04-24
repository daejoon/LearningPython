from django.views.generic.base import TemplateView
from quicksilver.decorations.set_variable import setTplViewVariable

class HomeView(TemplateView):
    template_name = 'home.html'

    # @setVariable("appName", "Home")
    def get(self, request, *args, **kwargs):
        context = super(HomeView, self).get(request, *args, **kwargs)
        context['test'] = [1, 2, 3, 4, 5]
        return context

