from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from myktj import views

admin.autodiscover()

urlpatterns = [
    # Examples:
    url(r'^', include('index.urls')),
    url(r'^admin/', include(admin.site.urls)),
    # url(r'^o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    url(r'^accounts/', include('myktj.urls')),
    url(r'^myktj$', 'myktj.views.myktj' , name="myktj"),
    url(r'^MYKTJ$', 'myktj.views.myktj' , name="myktj"),
    url(r'^MyKtj$', 'myktj.views.myktj' , name="myktj"),
    url(r'^MyKTJ$', 'myktj.views.myktj' , name="myktj"),
    url(r'^mailer/',include('mailer.urls')),
    url(r'^eventreg/',include('event.urls')),
    url(r'^kronicle/',include('blog.urls')),
    url(r'^sankalp/',include('sankalp.urls')),
    url(r'^roboticsworkshop/',include('blockchain.urls')),
    url(r'^math/',include('mathCh.urls')),
    url(r'^excalibur/',include('excalibur.urls')),
    url(r'^acco/', include('acco.urls')),
    url(r'^cryptex/',include('cryptex.urls')),
    url(r'^preference/',include('preference.urls')),
    url(r'^workshop1/', include('workshop1.urls')),
    url(r'^workshop2/', include('workshop2.urls')),
    url(r'^workshop3/', include('workshop3.urls')),
    url(r'^workshop4/', include('workshop4.urls')),
    url(r'^workshop5/', include('workshop5.urls')),
    url(r'^workshop6/', include('workshop6.urls')),
    url(r'^workshop7/', include('workshop7.urls')),
    url(r'^workshop8/', include('workshop8.urls')),
    url(r'^workshop9/', include('workshop9.urls')),
    url(r'^workshop10/', include('workshop10.urls')),
    url(r'^workshop11/', include('workshop11.urls')),
    url(r'^workshopregister/', include('workshopregister.urls')),
    
    url(r'^preference/save$', 'preference.views.save' , name="DIS"),
    url(r'^sourcecode/',include('sourcecode.urls')),
    url(r'^sourcecode/start1$','sourcecode.views.sourcecodestart1',name='DIS'),
    url(r'^sourcecode/start2$','sourcecode.views.sourcecodestart2',name='DIS'),
    url(r'^sourcecode/start3$','sourcecode.views.sourcecodestart3',name='DIS'),
    url(r'^sourcecode/start4$','sourcecode.views.sourcecodestart4',name='DIS'),
    url(r'^sourcecode/start5$','sourcecode.views.sourcecodestart5',name='DIS'),
    url(r'^sourcecode/start6$','sourcecode.views.sourcecodestart6',name='DIS'),
    url(r'^sourcecode/done$','sourcecode.views.sourcecodedone',name='DIS'),
    url(r'^sourcecode/submit$','sourcecode.views.sourcecodesubmit',name='DIS'),
    url(r'^sourcecode/success$','sourcecode.views.sourcecodedone',name='DIS'),
    url(r'^app/','index.views.app'),
    url(r'^schedule/','index.views.schedule'),

]
urlpatterns += staticfiles_urlpatterns()

