from django.conf.urls import include, url
from quicksilver.views import HomeView

urlpatterns = [
    url(r'^$', HomeView.as_view(), name="home"),
]
