from django.conf.urls import include, url
from myktj import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # Examples:
    # url(r'^$', 'ktj16.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^login$', csrf_exempt(views.login) , name="account_login"),
    url(r'^mlogin/$', csrf_exempt(views.mlogin) , name="myktj_login"),
    url(r'^msignin/$', csrf_exempt(views.msignin) , name="kolkata_login"),
    url(r'^success$', csrf_exempt(views.success) , name="account_success"),
    url(r'^institutes/$', csrf_exempt(views.institutes) , name="institutes"),
    url(ur'^institutes/(?P<state_val>.*)$', csrf_exempt(views.institutes) , name="institutes_state"),
    url(r'^profile$', csrf_exempt(views.profile) , name="profile"),
    url(r'^logout$', csrf_exempt(views.logout_ktj) , name="account_logout"),
    url(r'^signup$', csrf_exempt(views.signup) , name="account_signup"),
    url(r'^check_logged$', csrf_exempt(views.check_logged) , name="check_logged"),
    #url(r'^profile_exists$', csrf_exempt(views.profile_exists) , name="profile_exists"),

    url(r'^myktj$', csrf_exempt(views.myktj) , name="myktj"),
    url(r'^myktjprofile$', csrf_exempt(views.myktjProfile) , name="myktjprofile"),
    url(r'^myktjprofilesave$', csrf_exempt(views.updateMyktjProfile) , name="saveMyktjprofile"),
    url(r'^minstitutes/$', csrf_exempt(views.institutes) , name="institutes"),
    url(ur'^minstitutes/(?P<state_val>.*)$', csrf_exempt(views.institutes) , name="institutes_state"),
    url(r'^myktjpassword/$', csrf_exempt(views.myktjPassword) , name="myktjPassword"),
    url(r'^myktjpass_change$', csrf_exempt(views.myktjPasswordChanged) , name="myktjPasswordChanged"),
    url(r'^myktjteam$', csrf_exempt(views.myktjTeam) , name="myktjTeam"),
    url(r'^myktjteam/invites$', csrf_exempt(views.myktjInvite) , name="myktjInvite"),
    url(r'^saveteam$', csrf_exempt(views.saveTeam) , name="saveTeam"),
    url(r'^saveEvReg$', csrf_exempt(views.myktjEventReg) , name="saveEvReg"),
    url(r'^acceptInvite$',csrf_exempt(views.acceptInvite),name='acceptInvite'),
    url(r'^deleteInvite$',csrf_exempt(views.deleteInvite),name='deleteInvite'),
    url(r'^search$',csrf_exempt(views.search),name='search'),
    url(r'^invite$',csrf_exempt(views.invite),name='invite'),
    url(r'^removeTeam$',csrf_exempt(views.removeTeam),name='removeTeam'),
    url(r'^exitTeam$',csrf_exempt(views.exitTeam),name='exitTeam'),
    url(r'^fileupload$',csrf_exempt(views.fileupload),name='fileupload'),
    url(r'^myktjinstructions$',csrf_exempt(views.myktjInstructions),name='myktjinstructions'),
    url(r'^register_w$','event.views.register_w', name='kal_workshop_register'),
    url(r'^register_s$','event.views.register_s', name='social_initiative_register'),
    # url(r'^myktjpassword/$', 'django.contrib.auth.views.password_change', {'template_name': 'myktj/myktjpassword.html', 
    #     'post_change_redirect' :'/accounts/myktjpassword'},name='password_reset_confirm'),

    

]

