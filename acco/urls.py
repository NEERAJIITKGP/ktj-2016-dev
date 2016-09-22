from django.conf.urls import patterns, url
from acco import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = patterns('',

    url(r'^$', csrf_exempt(views.accomodate) , name="accomodate"),       
    url(r'^save$', csrf_exempt(views.save) , name="save"),
    url(r'^draftsave$', csrf_exempt(views.draftsave) , name="draftsave"),
    url(r'^success$', csrf_exempt(views.success) , name="success page"),
    url(r'^draftsuccess$', csrf_exempt(views.draftsuccess) , name="draft success page"),
    url(r'^guide$', csrf_exempt(views.guide) , name="guide"),
    url(r'^notifications$',csrf_exempt(views.validateFinalists),name='notifications'),
    url(r'^insert$',csrf_exempt(views.insert),name='notifications'),
    url(r'^insertdraft$',csrf_exempt(views.insertdraft),name='notifications'),
    
)
