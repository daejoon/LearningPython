from django.views.generic.base import TemplateView

class HomeView(TemplateView):
    template_name = 'home.html'

    def get(self, request, *args, **kwargs):
        context = super(HomeView, self).get(request, *args, **kwargs)
        context['object_list'] = ['books']
        return context

