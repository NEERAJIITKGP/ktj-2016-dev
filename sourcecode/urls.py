from django.conf.urls import patterns, url
from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from index import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ktj14.views.home', name='home'),
     url(r'^$', 'sourcecode.views.sourcecode'),
    # url(r'^sourcecodestart$', 'sourcecode.views.sourcecodestart'),
)
