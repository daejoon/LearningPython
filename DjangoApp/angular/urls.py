from django.conf.urls import patterns, url
from angular import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
]
