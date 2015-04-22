from django.conf.urls import include, url
from django.contrib import admin
import views

urlpatterns = [
    # Examples:
    # url(r'^$', 'DjangoApp.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.HomeView.as_view(), name="home"),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^books/', include('books.urls', namespace="books")),

]
