from django.conf.urls import patterns, url

urlpatterns = patterns('',
    # url(r'^hello$', 'index.views.hello', name = 'hello'),
    url(r'^register$','event.views.register',name='event_register'),
    url(r'^register_w$','event.views.register_w', name='kal_workshop_register'),
	url(r'^register_s$','event.views.register_s', name='social_initiative_register'),
	url(r'^workreg$','event.views.workreg', name='workshop_register'),
	url(r'^register_digital$','event.views.register_digital', name='Digital_India_Register'),
	url(r'^register_digitalworkshop$','event.views.register_digitalworkshop', name='Digital_India_Workshop_Register'),
	url(r'^register_sankalp$','event.views.register_sankalp', name='Sankalp_Register'),
	url(r'^register_blockchain$','event.views.register_blockchain', name='Blockchain_Register'),
    url(r'^iccreg$','event.views.iccreg',name='icc reg portal'),
    url(r'^roboreg$','event.views.roboreg',name='roboreg reg portal'),
    url(r'^tireg$','event.views.tireg',name='roboreg reg portal'),
)
