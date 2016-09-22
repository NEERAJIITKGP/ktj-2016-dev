from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView
from django.contrib.auth import logout
from django.http.response import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404, redirect, render_to_response
from django.contrib.auth.views import password_change
from datetime import datetime
from collections import OrderedDict
from django.contrib.auth.decorators import login_required
from myktj.forms import *
from event.models import *
from myktj.models import *
import json

def check_logged(request):
    data = {}
    data['logged'] = False
    if request.user.is_authenticated():
        data['logged'] = True
    return HttpResponse(json.dumps(data),  content_type='application/json')

class SignupView(FormView):
    template_name = "register_login/signup.html"
    form_class = ProfileForm
    
    def get_success_url(self):
        return '/accounts/success'

    def get_context_data(self, **kwargs):
        context = super(SignupView, self).get_context_data(**kwargs)
        return context
    
    def form_valid(self, form):
        self.object = form.save()
        return HttpResponseRedirect(self.get_success_url())

class LoginView(FormView):
    template_name = "register_login/login.html"
    form_class = LoginForm
    
    def get_success_url(self):
        return '/accounts/login'

    def get_context_data(self, **kwargs):
        context = super(LoginView, self).get_context_data(**kwargs)
        return context
    
    def form_valid(self, form):
        success_url = self.get_success_url()
        return form.login(self.request, redirect_url = success_url)

class MLoginView(FormView):
    template_name = "register_login/app-signin.html"
    form_class = MLoginForm
    
    def get_success_url(self):
        return '/accounts/myktj'

    def get_context_data(self, **kwargs):
        context = super(MLoginView, self).get_context_data(**kwargs)
        return context
    
    def form_valid(self, form):
        success_url = self.get_success_url()
        return form.mlogin(self.request, redirect_url = success_url)

class MSigninView(FormView):
    template_name = "register_login/msignin.html"
    form_class = MSigninForm
    
    def get_success_url(self):
        return '/roboticsworkshop'

    def get_context_data(self, **kwargs):
        context = super(MSigninView, self).get_context_data(**kwargs)
        return context
    
    def form_valid(self, form):
        success_url = self.get_success_url()
        return form.msignin(self.request, redirect_url = success_url)

def profile(request):
    user = request.user
    profile = get_object_or_404(Profile, user__pk = user.pk)
    
    return render(request, 'register_login/profile.html', {'profile':profile, 'user':user})

def logout_ktj(request):
    l=logout(request)
    if(l):
        return HttpResponse(True)
    else:
        return HttpResponse(False)


def institutes(request,state_val=None):
    if state_val is not 'all':
        institute=Institute.objects.filter(state__state=state_val).order_by('institute')
    else:
        institute=Institute.objects.all().order_by('institute.lower')
    institutes={}
    for insti in institute:
        institutes[insti.institute]=insti.institute
    if state_val != 19:
        other=Institute.objects.get(institute='other')
        institutes[other.institute]=other.institute

    sorted_instis=OrderedDict(sorted(institutes.items(), key=lambda t: t[0]))


    return HttpResponse(json.dumps(sorted_instis),content_type='application/json')

def success(request):
    return HttpResponse("<h1>You have Successfully registered <span onclick='closeRegister();openLogin();' class='register-login-box'>Login Here</span></h1>")

signup = SignupView.as_view()
login = LoginView.as_view()
mlogin = MLoginView.as_view()
msignin = MSigninView.as_view()


def myktj(request):
    user=request.user
    if(user.is_authenticated()):
        return render(request, 'myktj/m_main.html')
    else:
        return redirect('/accounts/mlogin')

#----------------------------------------------------------------------#
#--------------------------------MYKTJ---------------------------------#
#----------------------------------------------------------------------#




def myktjInstructions(request):
    return render(request, 'myktj/myktjinstructions.html')

def myktjProfile(request):
    args = {}
    initial = {}
    profile = get_object_or_404(Profile, user__pk = request.user.pk)
    form = ProfileForm()
    form.initial['gender'] = profile.gender
    form.initial['dateOfBirth'] = profile.dateOfBirth
    form.initial['country'] = profile.country
    form.initial['department'] = profile.department
    form.initial['year'] = profile.year
    form.initial['contact'] = profile.contact
    form.initial['address'] = profile.address
    form.initial['state'] = profile.state
    form.initial['institution'] = profile.institute
    form.initial['department'] = profile.department.department
    args['form'] = form
    args['user'] = request.user
    args['profile'] = get_object_or_404(Profile, user__pk = request.user.pk)
    return render(request, 'myktj/profile.html', args)


def updateMyktjProfile(request):
    user=request.user
    profile = get_object_or_404(Profile, user__pk = user.pk)
    if request.method == 'POST':
        # Calendar widget is a real headache
        user.first_name = request.POST['m_profile_firstname']
        user.last_name = request.POST['m_profile_lastname']
        DOB_day = str(request.POST['dateOfBirth_day'])
        DOB_month = str(request.POST['dateOfBirth_month'])
        if request.POST['dateOfBirth_day'] < 10:
            DOB_day = '0'+str(request.POST['dateOfBirth_day'])
        if request.POST['dateOfBirth_month'] < 10:
            DOB_month = '0'+str(request.POST['dateOfBirth_month'])
        DOB = DOB_day + DOB_month + str(request.POST['dateOfBirth_year'])
        DOB = datetime.strptime(DOB, "%d%m%Y").date()        
        # Lets update the profile now!
        profile.dateOfBirth = DOB
        profile.gender = request.POST['gender']
        profile.department = Department.objects.get(department=request.POST['department'])
        profile.year = request.POST['year']
        profile.institute = Institute.objects.get(institute=request.POST['institution'])
        profile.state = State.objects.get(state=request.POST['state'])
        profile.country = request.POST['country']
        profile.contact = request.POST['contact']
        profile.address = request.POST['address']
        user.save()
        profile.save()
    return HttpResponseRedirect('/accounts/myktj')

def myktjPassword(request):
    user = request.user
    if request.method == 'POST':
        u = request.user
        oldpwd = request.POST['old_password']
        newpwd1 = request.POST['new_password1']
        newpwd2 = request.POST['new_password2']
        if (newpwd1 == newpwd2):
            if len(newpwd1)>=6 and len(newpwd2)>=6:
                if authenticate(username = u.username, password = oldpwd):
                    print "Trying my luck!"
                    password_change(request=request, post_change_redirect='/accounts/myktjpass_change')
                    print "Lucky!"
                    errorMsg = "Password changed successfully!"
                    return HttpResponse(json.dumps(errorMsg), mimetype="application/json")
                else:
                    errorMsg = "Invalid password!"
                    return HttpResponse(json.dumps(errorMsg), mimetype="application/json")
            else:
                errorMsg = "Please enter a password of atleast 6 characters long!"
                return HttpResponse(json.dumps(errorMsg), mimetype="application/json")
        else:
            errorMsg = "Your new passwords don't match!"
            return HttpResponse(json.dumps(errorMsg), mimetype="application/json")
    args = {
    'user':user
    }
    return render(request, 'myktj/myktjpassword.html', args)

def myktjPasswordChanged(request):
    return render(request, 'myktj/myktjpassword_done.html')    

# Event Registration and team Formation

def myktjTeam(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    teams = Team.objects.filter(leader=profile).all()
    t_groups = Team.objects.filter(members=profile).all()
    invites=Invitation.objects.filter(user=user)
    invites_sent=[]
    for t in teams:
        if len(Invitation.objects.filter(team=t)):
            invites_sent.append(Invitation.objects.filter(team=t))
    evReg = []
    for ev in event_reg.objects.filter(user=user).all():
            evReg.append(ev.event)
    teamEvents = []
    for ev in Team.objects.filter(leader=profile).all():
        teamEvents.append(ev.event)
    genres = Genre.objects.all()
    events = Event.objects.all().order_by('genre__name').all()
    regEvents = set(events) - set(evReg)
    teamEv = set(evReg) - set(teamEvents)
    ctx = {
        'events':events,
        'genres':genres,
        'teams':teams,
        't_groups':t_groups,
        'evReg':evReg,
        'regEvents': regEvents,
        'teamEv':teamEv,
        'invites':invites,
        'invites_sent':invites_sent

    }
    return render(request, 'myktj/myktjteam.html', ctx)

def myktjInvite(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    teams = Team.objects.filter(leader=profile).all()
    invites=Invitation.objects.filter(user=user).filter(status=1)
    invites_sent=[]
    for t in teams:
        invitesFromTeam = Invitation.objects.filter(team=t).filter(status=1).all()
        if len(invitesFromTeam):
            for i in invitesFromTeam:
                invites_sent.append(i)
    ctx = {
        'teams':teams,
        'invites':invites,
        'invites_sent':invites_sent

    }
    return render(request, 'myktj/myktjinvites.html', ctx)



def myktjEventReg(request):
    user = request.user
    if request.POST:
        event_id = request.POST['r_event']
        event = Event.objects.get(pk=event_id)
        eventReg = event_reg(user=user, event=event)
        eventReg.save()
    return HttpResponse(True)



def saveTeam(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    event_id = request.POST['t_event']
    event = Event.objects.get(pk=event_id)
    if event.maxPeople > 1:
        if len(Team.objects.filter(leader=profile, event=event)) > 0:
            return HttpResponse("Sorry, you have already created a team for this event!")
        elif len(Team.objects.filter(members=profile, event=event)) > 0:
            return HttpResponse("Sorry, you are already a part of a team for this event!")
        else:
            team  = Team(leader=profile, event=event)
            team.save()
    return HttpResponse(True)

def invite(request):
    team_id=request.POST['team_id']
    user_id=request.POST['user_id']
    user=User.objects.get(username=user_id)
    team = Team.objects.get(pk=team_id)
    if user != request.user:
        print team.event.maxPeople
        len(Invitation.objects.filter(team=team))
        if len(Invitation.objects.filter(team=team)) < team.event.maxPeople-1:
            if len(Invitation.objects.filter(team=team).filter(user=user))>0:
                return HttpResponse('Invite was already send and is pending!!')
            else:
                try:
                    profile = team.leader
                    invite = Invitation(team=team,user=user,status=1)
                    invite.save()
                except:
                    return HttpResponse('Invite Failure!')
                return HttpResponse('Invited Successfully!')
        else:
            return HttpResponse("Sorry, you can't invite anymore members to this team!")
    else:
        return HttpResponse("You can't send an invitation to yourself!")

def acceptInvite(request):
    invite_id = request.POST['id']
    invite = Invitation.objects.get(pk=invite_id)
    user = request.user
    event = invite.team.event
    try:
        profile = Profile.objects.get(user=user)
    except:
        raise Http404
    teamCount = len(Team.objects.filter(leader=profile).filter(event = event)) + len(Team.objects.filter(event=event).filter(members=profile))
    if  teamCount == 0:
        if len(event_reg.objects.filter(user = user).filter(event = event)) == 0:
            evreg =event_reg(user = user, event = event)
        try:
            t = invite.team
            t.members.add(profile)
            t.save()
            invite.delete()
            return HttpResponse("Successfully Registered with the Team!!")
        except:
            return HttpResponse("Accept Failure");
    else:
        return HttpResponse("You are already a part of some team!!")
        
def removeTeam(request):
    team_id=request.POST['team_id']
    user=request.user
    try:
        t=Team.objects.get(pk=team_id)
        t.delete()
        return HttpResponse("Team successfully dismantled!")
    except:
        return HttpResponse("Unfortunately the team couldn't be dismantled!");

def exitTeam(request):
    team_id=request.POST['team_id']
    user=request.user
    profile=Profile.objects.get(user=user) 
    try:
        t=Team.objects.get(pk=team_id)
        t.members.remove(profile)
        t.save()
        return HttpResponse("Successfully removed from the team!!")
    except:
        return HttpResponse("Unable to exit team");


def search(request):
    search=request.GET['search']
    team=request.GET['tid']
    if search=="":
        return HttpResponse('No Results')
    results=User.objects.filter(username__contains=search)[0:5]
    return render_to_response('myktj/search.html',{'results':results,'tid':team})

def deleteInvite(request):
    invite_id=request.POST['id']
    try:
        user=request.user
        invite=Invitation.objects.get(pk=invite_id)
        if invite.team.leader==Profile.objects.get(user=user) or invite.user == user:
            invite.delete()
            return HttpResponse('Invited deleted Successfully')
        else:
            return HttpResponse('Invite Delete Failure!')
    except:
        return HttpResponse('Invite Delete Failure!')
    return HttpResponse('Invited Deleted Successfully')

def remove(request):
    pass

@csrf_exempt
def fileupload(request):
    user = request.user
    try:
        profile = Profile.objects.get(user=user)
    except:
        raise Http404
    teams = Team.objects.filter(leader=profile).all()

    if request.method == 'POST':
        event = Event.objects.get(name=request.POST['sub_event'])
        team = Team.objects.get(leader=profile, event=event)
        file=request.FILES['sub_file']
        filetype=request.POST['sub_filetype']
        instance = Submission.objects.filter(team=team).filter(profile=profile).filter(event=event)
        if len(instance)>0:
            instance = instance[0]
            instance.attempts += 1
            instance.file = file
            instance.save()
        else:
            instance = Submission(team=team, profile=profile,event=event, filetype=filetype, attempts=1, file=file)
            instance.save()

        if(instance.event):
            return HttpResponse('Upload Successful')

    else:
        ctx = {
        'teams':teams,
        }
        return render(request, 'myktj/myktjupload.html', ctx)