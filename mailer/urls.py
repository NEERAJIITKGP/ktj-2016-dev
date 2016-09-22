from django.conf.urls import patterns, url
from mailer import views
from django.views.decorators.csrf import csrf_exempt



urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ktj14.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^send$', csrf_exempt(views.mailer_send) , name="mailer_send"),
    url(r'^$', csrf_exempt(views.mailer) , name="mailer"),
    # Password reset URLs
    
   url(r'^password/reset/$','django.contrib.auth.views.password_reset',{'template_name': 'form.html'}, name='password_reset'),
    #url(r'^password/reset/confirm/$', 'django.contrib.auth.views.password_reset_confirm'),
    url(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', 'django.contrib.auth.views.password_reset_confirm', {'template_name': 'confirm.html'},name='password_reset_confirm'),
    #url(r'^password/reset/complete/$', 'django.contrib.auth.views.password_reset_complete'),
    url(r'^password/reset/complete/$', 'django.contrib.auth.views.password_reset_complete', {'template_name': 'complete.html'},name='password_reset_complete'),
    url(r'^password/reset/done/$', 'django.contrib.auth.views.password_reset_done', {'template_name': 'done.html'}, name='password_reset_done'),
)
