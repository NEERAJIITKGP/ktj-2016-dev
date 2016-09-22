from django.shortcuts import render, redirect
from django.views.generic.edit import FormView
from django.http.response import HttpResponse, HttpResponseRedirect, Http404
from django.views.decorators.csrf import csrf_exempt
from event.models import *
from journal.models import *
from myktj.models import *
from sponsor.models import *
from myktj.forms import *
from datetime import datetime,timedelta
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache


def index(request, workshop=False, event = False):
        menuDesc = MenuDescription.objects.all()
        updates = Update.objects.all()
        sponsTicker = TickerSpons.objects.all().order_by('rank');
        genres = Genre.objects.exclude(id=10)
        allEvents = Event.objects.all()
        exhibitions = Exhibition.objects.all()
        workshops = Workshop.objects.all()
        guests = Guest.objects.all()
        megashows = Megashow.objects.all()
        contactPost = ContactPost.objects.all()
        contacts = Contact.objects.all()
        tickerlink= TickerLink.objects.all()
       # try:
        #    if ( request.GET['show']=='2016'):
        #        years=Year.objects.all()
        #except:
          #  years=Year.objects.exclude(year=2016)
        years=Year.objects.all()
        for eve in allEvents:
            eve.introduction=eve.introduction.replace('\n',' ')
            eve.introduction=eve.introduction.replace('\r','')
            eve.contacts=eve.contacts.replace('\n',' ')
            eve.contacts=eve.contacts.replace('\r',' ')  
            eve.prizes=eve.prizes.replace('\n',' ')
            eve.prizes=eve.prizes.replace('\r',' ')       

        cntxt = {
          'menuDesc': menuDesc,
          'updates' : updates,
          'sponsTicker' : sponsTicker,
          'years' : years,
          'genres' : genres,
          'allEvents': allEvents,
          'exhibitions' : exhibitions,
          'workshops' : workshops,
          'guests' : guests,
          'megashows' : megashows,
          'contactPost' : contactPost,
          'contacts' : contacts,
          'tickerlink' : tickerlink,
           }

        return render(request,'index.html',cntxt)


    
    
  #Samples Views for redirect and render are below
  #def tcs(request ):
    #return render(request,'tcssub.html') 
    
  #def sub(request ):
    #return redirect("http://www.ktj.in/tcshackathonsubmission")

def feedback(request ):
  return render(request,'feedback.html')

def icc(request ):
  return redirect("http://ktj.in/events/indiancasechallenge")

def kca(request ):
  return redirect("https://docs.google.com/forms/d/1YbfpbGCUoUmVc5zPXLlu9XuIEaludnx8dwXJ3Yk1I7s/viewform")

def digital(request ):
  return redirect("http://ktj.in/initiatives")

def kal(request ):
  user=request.user
  if(user.is_authenticated()):
      return render(request, 'kolkata.html')
  else:
      return redirect('/accounts/msignin')



class registration(FormView):
    template_name = "register_login/app-signup.html"
    form_class = ProfileForm    
    def get_success_url(self):
        return '/accounts/msignin'

    def get_context_data(self, **kwargs):
        context = super(registration, self).get_context_data(**kwargs)
        return context
    
    def form_valid(self, form):
        self.object = form.save()
        return HttpResponseRedirect(self.get_success_url())
class mregistration(FormView):
    template_name = "register_login/app-signup.html"
    form_class = ProfileForm
    def get_success_url(self):
        return '/accounts/msignin'

    def get_context_data(self, **kwargs):
        context = super(mregistration, self).get_context_data(**kwargs)
        return context

    def form_valid(self, form):
        self.object = form.save()
        return HttpResponseRedirect(self.get_success_url())



def push(request ):
  return render(request,'push.html')

def digitalindia(request):
  return render(request, 'digital.html')
  
def snappit(request ):
  error=''
  try:
    if( request.GET['error'] is not None):
      error='All Fields are mandatory'
  except:
    pass
  return render(request,'snappit.html',{'error':error})


@csrf_exempt
def snappitsave(request):
  if request.method == 'POST':
      if(request.POST['name'] != '' and request.POST['contact'] != '' and request.POST['email'] != '' and request.POST['country'] != '' and request.POST['state'] != '' and request.POST['institute'] != '' ):
          snap = Snappit()
          snap.name = request.POST['name']
          snap.contact = request.POST['contact']
          snap.email = request.POST['email']
          snap.country = request.POST['country']
          snap.state = request.POST['state']
          snap.institute = request.POST['institute']
          snap.file=request.FILES['sub_file']
          snap.filename= request.FILES['sub_file'].name
          snap.subdate=datetime.now()
          # instance = Snappit.objects.filter(name=name).filter(contact=contact).filter(email=email)
          # if len(instance)>0:
          #     instance = instance[0]
          #     instance.attempts += 1
          #     instance.file = file
          #     instance.save()
          # else:
          #     instance = Snappit(name=name,contact=contact,email=email, country=country,state=state, institute=institute,file = file ,filetype = filetype, attempts = 1)
          #     instance.save()
          snap.save()
    
          return redirect('/snappit/success', permanent=True)
      else :
          return redirect('/snappit?error=1', permanent=True)
  else :
      return redirect('/snappit')
  

def snappitsuccess(request ):
  return render(request,'snappitsuccess.html')

def mastermind(request ):
  user=request.user
  if user.groups.filter(name='Mastermind').exists():
    timestart = MastermindUser.objects.filter(user = user)
    if len(timestart)>0:
            return HttpResponseRedirect('/mastermind/start')
    return render(request,'mastermind.html')
  else:
    return HttpResponse("Not authorised to view the page")

@never_cache
def mastermindstart (request):
  user = request.user
  if user.groups.filter(name='Mastermind').exists():
    answersAll = Mastermind.objects.filter(user = user)
    minremain = 30
    secremain = 00
    if len(MastermindUser.objects.filter(user = user))==0:
        firstclick = datetime.now()
        play = MastermindUser (user=user, last_played=firstclick)
        play.save()
    gamestatus = MastermindUser.objects.filter(user = user)[0]
    if len(answersAll)>0:
        return HttpResponseRedirect('/mastermind/done')
    if gamestatus.gameover == 1:
        return HttpResponseRedirect('/mastermind/done')
    if len(MastermindUser.objects.filter(user = user))>0:
        playstart = MastermindUser.objects.filter(user = user)[0]
        if playstart.last_played > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            return render(request, 'mastermindstart.html', {'minremain':minremain, 'secremain':secremain})
        else:
            playstart.gameover = 1
            playstart.save()
            return HttpResponseRedirect('/mastermind/success')
    gamestatus.gameover = 1
    gamestatus.save()
    return render(request,'mastermindstart.html', {'minremain':minremain, 'secremain':secremain})
  else:
    return HttpResponse("Not authorised to view the page")

def mastermindsubmit(request):
  user = request.user
  if user.groups.filter(name='Mastermind').exists():
    gamestatus = MastermindUser.objects.filter(user = user)[0]
    answersAll = Mastermind.objects.filter(user = user)
    if gamestatus.gameover == 1:
        return HttpResponseRedirect('/mastermind/done')
    if len(answersAll)==0:
        if request.method =="POST":
            answer1 = request.POST.get('answer1')
            answer2 = request.POST.get('answer2')
            answer3 = request.POST.get('answer3')
            answer4 = request.POST.get('answer4')
            answer5 = request.POST.get('answer5')
            answer6 = request.POST.get('answer6')
            answer7 = request.POST.get('answer7')
            answer8 = request.POST.get('answer8')
            answer9 = request.POST.get('answer9')
            answer10 = request.POST.get('answer10')
            answer11 = request.POST.get('answer11')
            answer12 = request.POST.get('answer12')
            answer13 = request.POST.get('answer13')
            answer14 = request.POST.get('answer14')
            answer15 = request.POST.get('answer15')
            answer16 = request.POST.get('answer16')
            answer17 = request.POST.get('answer17')
            answer18 = request.POST.get('answer18')
            answer19 = request.POST.get('answer19')
            answer20 = request.POST.get('answer20')
            answer21 = request.POST.get('answer21')
            answer22 = request.POST.get('answer22')
            answer23 = request.POST.get('answer23')
            answer24 = request.POST.get('answer24')
            answer25 = request.POST.get('answer25')
            mastermindanswer = Mastermind(user=user, answer1=answer1,answer2=answer2,answer3=answer3,answer4=answer4,answer5=answer5,answer6=answer6,answer7=answer7,answer8=answer8,answer9=answer9,answer10=answer10,answer11=answer11,answer12=answer12,answer13=answer13,answer14=answer14,answer15=answer15,answer16=answer16,answer17=answer17,answer18=answer18,answer19=answer19,answer20=answer20,answer21=answer21,answer22=answer22,answer23=answer23,answer24=answer24,answer25=answer25)
            mastermindanswer.save()
            gamestatus.gameover = 1
            gamestatus.save()
    return HttpResponseRedirect('/mastermind/success')
  else:
    return HttpResponse("Not authorised to view the page")

def mastermindsuccess(request ):
  return render(request,'mastermindsuccess.html')

def masterminddone(request ):
  return render(request,'masterminddone.html')

def app(request):
  return redirect('https://play.google.com/store/apps/details?id=kshitij.iitkgp.ktj&hl=en')
def schedule(request):
  return render(request,'schedule.html')
