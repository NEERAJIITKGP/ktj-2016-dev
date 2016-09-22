from django.conf.urls import patterns, url
from django.views.decorators.csrf import csrf_exempt
from workshopregister import views
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

admin.autodiscover()

urlpatterns = patterns('',
    # url(r'^hello$', 'index.views.hello', name = 'hello'),
    #url(r'^work_ktj_202901$','workshopregister.views.work1',name='index'),
    #url(r'^work_ktj_193105$','workshopregister.views.work2',name='index'),
    #url(r'^work_ktj_011311$','workshopregister.views.work3',name='index'),
    #url(r'^work_ktj_907641$','workshopregister.views.work4',name='index'),
    #url(r'^work_ktj_748961$','workshopregister.views.work5',name='index'),
    #url(r'^work_ktj_590134$','workshopregister.views.work6',name='index'),
    #url(r'^work_ktj_028651$','workshopregister.views.work7',name='index'),
    #url(r'^work_ktj_979891$','workshopregister.views.work8',name='index'),
    url(r'^work_ktj_897340$','workshopregister.views.work9',name='index'),
    #url(r'^work_ktj_758696$','workshopregister.views.work10',name='index'),

    url(r'^login$',csrf_exempt(views.login),name='login'),
    url(r'^logout$','workshopregister.views.logout_workshop', name='logour'),
)
urlpatterns += staticfiles_urlpatterns()
