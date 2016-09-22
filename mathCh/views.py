from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from mathCh.models import mathChallengeInfo,MathQuestion,mathUserAnswer, MathUserTime, MathPlayer
from django.contrib.auth.models import User
from django.contrib.auth import  login, logout, authenticate
from django.views.decorators.cache import never_cache
from myktj.models import Profile
import datetime
from datetime import timedelta, datetime
from django.utils.timezone import utc
from django.utils import timezone
import cgi, re

def mathchallenge(request):
    if request.user.is_authenticated():
        matter = mathChallengeInfo.objects.all()[0]
        user = request.user
        timestart = MathUserTime.objects.filter(user = user)
        if len(timestart)>0:
            return HttpResponseRedirect('/math/qstn/')    
        return render(request,'main_math.html',{'matter':matter,})
        #return HttpResponse('<h2>Sorry, we are updating valuable information. Please bear with us</h2>')
    else:
    	try:
    		matter = mathChallengeInfo.objects.all()[0]
    		mathchallengeinfos = mathChallengeInfo.objects.all()
    	except:
    		return HttpResponse('<h2>Sorry, we are updating valuable information. Please bear with us</h2>')
    	
    	return render(request,'login_math.html',{'matter':matter, 'mathchallengeinfos':mathchallengeinfos, })
        #return HttpResponse('<h2>Sorry, we are updating valuable information. Please bear with us</h2>')

@never_cache
def mathchallengePlay(request):
    matter = mathChallengeInfo.objects.all()[0]
    mathchallengeinfos = mathChallengeInfo.objects.all()
    if request.method == 'POST':
        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            return HttpResponseRedirect("/math")
#            return render(request,'main_math.html',{'matter':matter, 'mathchallengeinfos':mathchallengeinfos})
        else:
            return HttpResponse('<p style="font-family:Trebuchet MS; font-size:20px; font-weight:bolder;">Sorry, please enter valid credentials.</p><a style="font-family:Trebuchet MS; font-size:20px; font-weight:bolder;" href="/math">Go Back</a>')
    else:
        return render(request, 'login_math.html', {'matter':matter, 'mathchallengeinfos':mathchallengeinfos})

@never_cache
def qstns(request):
    user = request.user
    answersAll = mathUserAnswer.objects.filter(user = user)
    matter = mathChallengeInfo.objects.all()[0]
    qstns = MathQuestion.objects.all()
    if len(MathPlayer.objects.filter(user=user))==0:
        player = MathPlayer(user=user)
        player.save()
    minremain = 30
    secremain = 00
    #timestart = MathUserTime.objects.filter(user = user)
    if len(MathUserTime.objects.filter(user = user))==0:
        firstclick = datetime.now()
        play = MathUserTime (user=user, last_played=firstclick)
        play.save()
    if len(answersAll)>0:
        return render(request,'submitted_math.html', {'matter':matter,})
    if len(MathUserTime.objects.filter(user = user))>0:
        playstart = MathUserTime.objects.filter(user = user)[0]
        if playstart.last_played > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            return render(request, 'question_math.html', {'matter':matter, 'qstns':qstns, 'minremain':minremain, 'secremain':secremain})
        else:
            playstart.gameover = 1
            playstart.save()
            return HttpResponseRedirect('/math/submit/')
	return render(request, 'question_math.html', {'matter':matter, 'qstns':qstns, 'minremain':minremain, 'secremain':secremain})

def submit(request):
    matter = mathChallengeInfo.objects.all()[0]
    user = request.user
    qstns = MathQuestion.objects.all()
    gamestatus = MathUserTime.objects.filter(user = user)[0]
    answersAll = mathUserAnswer.objects.filter(user = user)
    if gamestatus.gameover == 1:
        return render(request,'final_math.html', {'matter':matter,})
    if len(answersAll)==0:
	    for q in qstns:
	    	if request.method =="POST":
	        	answer = request.POST['answer'+str(q.id)]
	        	ques = q
	        	mathanswer = mathUserAnswer(user=user, answer=answer, qstn=ques)
	        	mathanswer.save()
                gamestatus.gameover = 1
                gamestatus.save()
    return render(request,'final_math.html', {'qstns':qstns, 'matter':matter})
    
def logout_user(request):
    logout(request)
    matter = mathChallengeInfo.objects.all()[0]
    mathchallengeinfos = mathChallengeInfo.objects.all()
    return HttpResponseRedirect("/math")
