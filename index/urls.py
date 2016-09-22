from django.conf.urls import patterns, url
from django.views.decorators.csrf import csrf_exempt
from index import views

urlpatterns = patterns('',
    # url(r'^hello$', 'index.views.hello', name = 'hello'),
    url(r'^$','index.views.index',name='index'),
    url(r'^events$','index.views.index',name='events'),
    url(r'^initiatives$','index.views.index',name='initiatives'),
    url(r'^workshops$','index.views.index',name='workshops'),
    url(r'^events/(?P<event>\w+)$','index.views.index',name='events'),
    # url(r'^events/(?P<initiative>\w+)$','index.views.index',name='initiative'),
    url(r'^sponsors$','index.views.index',name='sponsors'),
    # url(r'^sponsors_display$','index.views.sponsors_display',name='sponsors_display'),
    url(r'^exhibitions$','index.views.index',name='exhibitions'),
    url(r'^megashows$','index.views.index',name='megashows'),
    url(r'^guests$','index.views.index',name='guests'),
    url(r'^contacts$','index.views.index',name='contacts'),
    url(r'^prefernce$','index.views.index'),
    url(r'^signup$', csrf_exempt(views.registration.as_view()) , name="registration"),
    url(r'^msignup$', csrf_exempt(views.mregistration.as_view()) , name="registration"),

    #activate below url for specific workshop link
    #url(r'^workshops/(?P<workshop>\w+)/$','index.views.index',name='trythis'),
    url(r'^feedback$','index.views.feedback',name='index'),
    url(r'^CampusAffiliate$','index.views.kca',name='index'),
    url(r'^KolkataWorkshop$','index.views.kal',name='index'),
    url(r'^kolkataworkshop$','index.views.kal',name='index'),
    url(r'^Kolkataworkshop$','index.views.kal',name='index'),
    url(r'^kolkataWorkshop$','index.views.kal',name='index'),
#	url(r'^sankalp$','index.views.sankalp',name='index'),
    url(r'^icc2016$','index.views.icc',name='ICC2016'),
    url(r'^ICC2016$','index.views.icc',name='ICC2016'),
    url(r'^initiatives/digitalindia$','index.views.digitalindia',name='initiatives'),
    url(r'^initiatives/DigitalIndia$','index.views.digitalindia',name='initiatives'),
    url(r'^snappit$','index.views.snappit',name='snappit'),
    url(r'^snappit/save$','index.views.snappitsave',name='snappit'),
    url(r'^snappit/success$','index.views.snappitsuccess',name='snappit'),

    url(r'^digitalindia$','index.views.digitalindia',name='DIS'),
    url(r'^digitalindiasummit$','index.views.digitalindia',name='DIS'),
    url(r'^mastermind$','index.views.mastermind',name='DIS'),
    url(r'^mastermind/start$','index.views.mastermindstart',name='DIS'),
    url(r'^mastermind/submit$','index.views.mastermindsubmit',name='DIS'),
    url(r'^mastermind/success$','index.views.mastermindsuccess',name='DIS'),
    url(r'^mastermind/done$','index.views.masterminddone',name='DIS'),
    #testing urls
    url(r'^push$','index.views.push',name='index'),
    #url(r'^sourcecode/',include('sourcecode.urls')),

)
