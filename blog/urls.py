from django.conf.urls import patterns, url

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ktj14.views.home', name='home'),
    url(r'^$', 'blog.views.kronicle', name='blog'),
    url(r'^(?P<post>\w+)$','blog.views.kronicle', name='blog_post'),
)
