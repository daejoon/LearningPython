from django.conf.urls import include, url
from quicksilver.views import HomeView, AngularTplView, NotebookView, TrashView, RecentNoteView, NoteListView, NoteView

urlpatterns = [
    url(r'^$', HomeView.as_view(), name="home"),
    url(r'^tpl/(?P<page_name>.+)$', AngularTplView.as_view(), name="angular_tpl"),
    url(r'^notebook/$', NotebookView.as_view(), name="notebook"),
    url(r'^trash/$', TrashView.as_view(), name='trash'),
    url(r'^recentnote/$', RecentNoteView.as_view(), name='recentnote'),
    url(r'^notelist/(?P<notebook_id>\d+)$', NoteListView.as_view(), name='notelist'),
    url(r'^note/(?P<note_id>\d+)$', NoteView.as_view(), name='note'),
]
