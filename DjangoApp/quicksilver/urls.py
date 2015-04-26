from django.conf.urls import include, url
from quicksilver.views import HomeView, AngularTplView

urlpatterns = [
    url(r'^$', HomeView.as_view(), name="home"),
    url(r'^tpl/(?P<page_name>.+)$', AngularTplView.as_view(), name="angular_tpl"),

]
