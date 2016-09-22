from django.conf.urls import patterns, url

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ktj14.views.home', name='home'),

     url(r'^$', 'preference.views.index'),
     url(r'/save^$', 'preference.views.save')
)
