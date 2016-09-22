from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from random import randrange
from cryptex.models import *
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView
from cryptex.forms import *
from django.contrib.auth import logout
import json
import datetime
# Create your views here.

MAX_TRAILS=10

"""
Important Functions
"""
def get_rand_answer():
    """
    This will return a random number to use as sample solution.     
    the returned object is string
    """
    one=randrange(1,9,1)
    two=randrange(1,9,1)
    three=randrange(1,9,1)
    four=randrange(1,9,1)
    return `one`+`two`+`three`+`four`

def get_pegs(question,recve):
    ans=question.answer
    blue=0
    white=0
    for count,option in enumerate(recve):
        if (option==ans[count]):
            blue+=1
    tobedeleted=[]
    for count,option in enumerate(recve):
        if (option==ans[count]):
            tobedeleted+=[count]
    f=0
    for a in tobedeleted:
        ans=ans[:a-f]+ans[a-f+1:]
        f+=1
    for count,option in enumerate(recve):
        if (option in ans):
            white+=1
    data={
        'white':white,
        'blue':blue,
    }
    return data
    

def create_new_question (user,is_trail):
    a=Question.objects.all().filter(is_active=True,user=user)
    if (len(a)!=0):
        a[0].is_active=False
        a[0].save()
    a=Question(user=user,answer=get_rand_answer(),is_trail=is_trail)
    a.created_on=datetime.datetime.now().replace(tzinfo=None)
    a.save()
    return a

"""
Views
"""
class LoginView(FormView):
    template_name = "cryptex/login.html"
    form_class = LoginForm
    
    def get_success_url(self):
        return '/cryptex/login'

    def get_context_data(self, **kwargs):
        context = super(LoginView, self).get_context_data(**kwargs)
        return context
    
    def form_valid(self, form):
        success_url = self.get_success_url()
        return form.login(self.request, redirect_url = success_url)

login = LoginView.as_view()
def logout_cryptex(request):
    logout(request)
    return redirect('/cryptex/login')
    
"""
submit_answers:
    
"""
def submit_answer (request):
    received = False
    processed = False
    new_question=True    
    if request.user.is_authenticated():
        if (request.GET['answer']):
            recve=request.GET['answer']
            received=True
            try:
                question = Question.objects.filter( user=request.user ).get( is_active=True )
            except Question.DoesNotExist:
                question = None
                return HttpResponse(json.dumps({'is_completed':True}),content_type='application/json')
            pegs=get_pegs(question,recve)
            trail=Trail(question=question,trail=recve,white=pegs['white'],blue=pegs['blue'])
            trail.save()
            processed=True
            is_won=False
            is_completed=False
            print 'false'
            secs=0
            mins=0
            if (trail.blue==4):
                is_completed=True
                print 'True'
                is_won=True
                timemade=question.created_on
                timenow=datetime.datetime.now()
#                timenow=timenow.replace(tzinfo=None)
                timemade=timemade.replace(tzinfo=None)
                d=timenow-timemade
                print d
                mins=d.seconds//60
                temp=d-datetime.timedelta(minutes=mins)
                secs=temp.seconds
                
                try:
                    recbesttime=BestTime.objects.get(user=request.user)
                    if (mins<recbesttime.mins):
                        recbesttime.mins=mins
                        recbesttime.sec=secs
                        recbesttime.save()
                    elif(mins==recbesttime.mins):
                        if(secs<recbesttime.sec):
                            recbesttime.mins=mins
                            recbesttime.sec=secs
                            recbesttime.save()
                except:
                    besttime=BestTime(user=request.user,mins=mins,sec=secs)
                    besttime.save()
                question.is_active=False
                question.result=True
                question.save()
            else:
                is_completed=False
                print 'false'
            numoftrails=question.num_of_trails()
            if (numoftrails>=10):
                is_completed=True
                print 'ture'
                question.is_active=False
                question.save()
            data={
                'is_completed':is_completed,
                'is_won':is_won,
                'trail':trail.trail,
                'white':pegs['white'],
                'blue':pegs['blue'],
                'secs':secs,
                'mins':mins-330,
            }
            return HttpResponse(json.dumps(data),content_type='application/json')
    else:
        return login(request)
    
def gethistory(request):
    a=Question.objects.all().filter(user=request.user,is_active=False)
    if len(a)<=0:
        data={'is_empty':True,}
    else:
        data={'is_empty':False,}
    tempdata={}
    for b,c in enumerate(a):
        tempdata.update({`c.id`:c.answer,})
    data.update({'data':tempdata,})
    HttpResponse(json.dumps(data),content_type='application/json')

def getquestion(request):
    try:
        a=Question.objects.get(user=request.user,is_active=True)
        data={'is_new_question':False}
        trails={}
        b=Trail.objects.filter(question=a)
        for d,c in enumerate(b):
            temp={'trail':c.trail,
                  'white':c.white,
                  'blue':c.blue,
                 }
            trails.update({d:temp,})
        data.update({'trails':trails,})
    except Question.DoesNotExist:
        a=create_new_question(request.user,False)
        data={'is_new_question':True}
    return HttpResponse(json.dumps(data),content_type='application/json')
                
def Index(request):
    if request.user.is_authenticated():
        template='cryptex/index.html'
        cntxt={'username':request.user.first_name+' '+request.user.last_name}
    else:
        return login (request)        
    return render(request,template,cntxt)
def getStats(request):
    if request.user.is_authenticated():
        total=len(Question.objects.filter(user=request.user).filter(is_active=False))
        won=len(Question.objects.filter(user=request.user).filter(result=True).filter(is_active=False))
        lost=len(Question.objects.filter(user=request.user).filter(result=False).filter( is_active=False)) 
        try:
            besttime=BestTime.objects.get(user=request.user)
            mins=besttime.mins
            secs=besttime.sec
        except BestTime.DoesNotExist:
            besttime=None
            mins=None
            secs=None
        cntxt={
            'total':total,
            'won':won,
            'lost':lost,
            'mins':mins-330,
            'secs':secs,
        }
        return HttpResponse(json.dumps(cntxt),content_type='application/json')
    else:
        return login(request)