from django.conf.urls import include, url
from django.contrib import admin
from DjangoApp import views

urlpatterns = [
    url(r'^$', views.HomeView.as_view(), name="home"),
    url(r'^admin/', include(admin.site.urls)),


    url(r'^books/', include('books.urls', namespace="books")),
    url(r'^angular/', include('angular.urls', namespace="angular")),
]
