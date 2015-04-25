from django.conf.urls import include, url
from django.contrib import admin
from quicksilver.views import HomeView

urlpatterns = [
    url(r'^$', HomeView.as_view(), name="home"),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^quicksilver/', include('quicksilver.urls', namespace='quicksilver')),
]
