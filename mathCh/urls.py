from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$', 'mathCh.views.mathchallenge', name='mathchallenge'),
	url(r'^mathchallengePlay/$', 'mathCh.views.mathchallengePlay', name='mathchallengePlay'),
	url(r'^mathchallengePlay/qstn/$', 'mathCh.views.qstns', name='qstn1'),
	url(r'^mathchallengePlay/submit/$', 'mathCh.views.submit', name='submit'),
	url(r'^qstn/$', 'mathCh.views.qstns', name='q_qstn1'),
	url(r'^submit/$', 'mathCh.views.submit', name='q_submit'),
	url(r'^logout/$', 'mathCh.views.logout_user', name='logout'),
)
