from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$', 'excalibur.views.excalibur', name='excalibur'),
	url(r'^excaliburPlay/$', 'excalibur.views.excaliburPlay', name='excaliburPlay'),
	url(r'^ques$', 'excalibur.views.ques', name='q_ques'),
	#url(r'^ques2/$', 'excalibur.views.qstn2', name='q_ques2'),
	#url(r'^ques3/$', 'excalibur.views.qstn3', name='q_ques3'),
	#url(r'^ques4/$', 'excalibur.views.qstn4', name='q_ques4'),
	#url(r'^ques5/$', 'excalibur.views.qstn5', name='q_ques5'),
	#url(r'^ques6/$', 'excalibur.views.qstn6', name='q_ques6'),
	#url(r'^ques7/$', 'excalibur.views.qstn7', name='q_ques7'),
	#url(r'^ques8/$', 'excalibur.views.qstn8', name='q_ques8'),
	#url(r'^ques9/$', 'excalibur.views.qstn9', name='q_ques9'),
	#url(r'^ques10/$', 'excalibur.views.qstn10', name='q_ques10'),
	#url(r'^ques11/$', 'excalibur.views.qstn11', name='q_ques11'),
	#url(r'^ques12/$', 'excalibur.views.qstn12', name='q_ques12'),
	#url(r'^ques13/$', 'excalibur.views.qstn13', name='q_ques13'),
	#url(r'^ques14/$', 'excalibur.views.qstn14', name='q_ques14'),
	#url(r'^ques15/$', 'excalibur.views.qstn15', name='q_ques15'),
	#url(r'^quesover/$', 'excalibur.views.qstnover', name='q_ques0'),
	#url(r'^excalibur/ques1/$', 'excalibur.views.qstn1', name='q_qstn1'),
	#url(r'^excalibur/ques2/$', 'excalibur.views.qstn2', name='q_qstn2'),
	#url(r'^excalibur/ques3/$', 'excalibur.views.qstn3', name='q_qstn3'),
	#url(r'^excalibur/ques4/$', 'excalibur.views.qstn4', name='q_qstn4'),
	#url(r'^excalibur/ques5/$', 'excalibur.views.qstn5', name='q_qstn5'),
	#url(r'^excalibur/ques6/$', 'excalibur.views.qstn6', name='q_qstn6'),
	#url(r'^excalibur/ques7/$', 'excalibur.views.qstn7', name='q_qstn7'),
	#url(r'^excalibur/ques8/$', 'excalibur.views.qstn8', name='q_qstn8'),
	#url(r'^excalibur/ques9/$', 'excalibur.views.qstn9', name='q_qstn9'),
	#url(r'^excalibur/ques10/$', 'excalibur.views.qstn10', name='q_qstn10'),
	#url(r'^excalibur/ques11/$', 'excalibur.views.qstn11', name='q_qstn11'),
	#url(r'^excalibur/ques12/$', 'excalibur.views.qstn12', name='q_qstn12'),
	#url(r'^excalibur/ques13/$', 'excalibur.views.qstn13', name='q_qstn13'),
	#url(r'^excalibur/ques14/$', 'excalibur.views.qstn14', name='q_qstn14'),
	#url(r'^excalibur/ques15/$', 'excalibur.views.qstn15', name='q_qstn15'),
	#url(r'^excalibur/quesover/$', 'excalibur.views.qstnover', name='q_qstn0'),
	url(r'^logout/$', 'excalibur.views.exclogout', name='exclogout'),
)