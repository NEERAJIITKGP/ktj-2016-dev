from django.conf.urls import patterns, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from blockchain import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ktj14.views.home', name='home'),
     url(r'^$', 'blockchain.views.index'),
     url(r'^kolkata','blockchain.views.kolkata',name='index'),

     url(r'^bhubneswar','blockchain.views.bhubneswar',name='index'),
     url(r'^indore','blockchain.views.indore',name='index'),
     url(r'^allahabad','blockchain.views.allahabad',name='index'),
      url(r'^hyderabad','blockchain.views.hyderabad',name='index'),
       url(r'^kanpur','blockchain.views.kanpur',name='index'),
      url(r'^lucknow','blockchain.views.lucknow',name='index'),
     url(r'^raipur','blockchain.views.raipur',name='index'),
    url(r'^rourkela','blockchain.views.rourkela',name='index'),
     url(r'^checkout/$', views.checkout, name='order.checkout'),
    url(r'^success/$', views.success, name='order.success'),
    url(r'^failure/$', views.failure, name='order.failure'),
    url(r'^cancel/$', views.cancel, name='order.cancel'),
)
urlpatterns += staticfiles_urlpatterns()