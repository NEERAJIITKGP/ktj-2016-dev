from django.conf.urls import patterns, url
from django.views.decorators.csrf import csrf_exempt
from cryptex import views
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

admin.autodiscover()

urlpatterns = patterns('',
    # url(r'^hello$', 'index.views.hello', name = 'hello'),
    url(r'^$','cryptex.views.Index',name='index'),
    url(r'^login$',csrf_exempt(views.login),name='login'),
    url(r'^submitanswer$','cryptex.views.submit_answer', name="submitanswer"),
    url(r'^gethistory$', 'cryptex.views.gethistory', name='gethistory'),
    url(r'^getquestion$','cryptex.views.getquestion', name='getquestion'),
    url(r'^logout$','cryptex.views.logout_cryptex', name='logour'),
    url(r'^getstats$','cryptex.views.getStats', name='logour'),
)
urlpatterns += staticfiles_urlpatterns()
