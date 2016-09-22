from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from excalibur.models import ExcaliburInfo,ExcaliburQuestion,ExcaliburUserAnswer, ExcaliburPlayer,ExcaliburQuestionCount
from django.contrib.auth.models import User
from django.contrib.auth import  login, logout, authenticate
from myktj.models import Profile
import urllib
import cgi, re

def excalibur(request):
    if request.user.is_authenticated():
        matter = ExcaliburInfo.objects.all()[0]
        excaliburinfos = ExcaliburInfo.objects.all()
        return render(request,'main_exc.html',{'matter':matter, 'excaliburinfos':excaliburinfos})
        #return HttpResponse('<h2>Sorry, we are updating valuable information. Please bear with us</h2>')
    else:
    	try:
    		matter = ExcaliburInfo.objects.all()[0]
    		excaliburinfos = ExcaliburInfo.objects.all()
    	except:
    		return HttpResponse('<h2>Sorry, we are updating valuable information. Please bear with us</h2>')
    	
    	return render(request,'login_exc.html',{'matter':matter, 'excaliburinfos':excaliburinfos, })
        #return HttpResponse('<h2>Sorry, we are updating valuable information. Please bear with us</h2>')

def excaliburPlay(request):
    matter = ExcaliburInfo.objects.all()[0]
    excaliburinfos = ExcaliburInfo.objects.all()
    if request.method == 'POST':
        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            return HttpResponseRedirect("/excalibur")
#            return render(request,'main_math.html',{'matter':matter, 'excaliburinfos':excaliburinfos})
        else:
            return HttpResponse('<p style="font-family:Trebuchet MS; font-size:20px; font-weight:bolder;">Sorry, please enter valid credentials.</p><a style="font-family:Trebuchet MS; font-size:20px; font-weight:bolder;" href="/excalibur">Go Back</a>')
    else:
        return render(request, 'login_exc.html', {'matter':matter, 'excaliburinfos':excaliburinfos})

def ques(request):
    user= request.user
    if len(ExcaliburPlayer.objects.filter(user=user))==0:
        player = ExcaliburPlayer(user=user)
        player.save()
    numb_q = urllib.unquote(request.GET['q'])
    q=int(numb_q)
    matter = ExcaliburInfo.objects.all()[0]
    q_no=q+1
    q_back = q-1
    q_tot = ExcaliburQuestion.objects.all()
    if q <= 15:
        qstns = ExcaliburQuestion.objects.all()[q-1]
#    answersAll = Excalibur2UserAnswer.objects.filter(user = user).filter(qstn = qstns)
#    if len(answersAll)>0:
#        matter = Excalibur2Info.objects.all()[0]
#        return render(request,'nextques_exc.html', { 'matter':matter,'qstns':qstns, 'q_no':q_no,})
    if q==1:
        if request.method=="POST":
            ques = ExcaliburQuestion.objects.all()
            try:
                q_answer = request.POST['answer']
                if len(ExcaliburUserAnswer.objects.filter(user = user).filter(qstn = ques))==0:
                    useranswer = ExcaliburUserAnswer(user=user, answer=q_answer, qstn=ques)
                    useranswer.save()
                    quescount = ExcaliburQuestionCount.objects.get(question=ques)
                    quescount.count += 1
                    quescount.save()
                else:
                    quiz_obj = ExcaliburUserAnswer.objects.filter(user = user).filter(qstn = ques)[0]
                    quiz_obj.answer = q_answer
                    quiz_obj.save()
            except:
                pass
    if (q-2)>=0:
        if request.method=="POST":
            ques = ExcaliburQuestion.objects.all()[q-2]
            q_answer = request.POST['answer']
            if len(ExcaliburUserAnswer.objects.filter(user = user).filter(qstn = ques))==0:
                useranswer = ExcaliburUserAnswer(user=user, answer=q_answer, qstn=ques)
                useranswer.save()
                quescount = ExcaliburQuestionCount.objects.get(question=ques)
                quescount.count += 1
                quescount.save()
            else:
                quiz_obj = ExcaliburUserAnswer.objects.filter(user = user).filter(qstn = ques)[0]
                quiz_obj.answer = q_answer
                quiz_obj.save()
    if (q)>=15:
        q_no=q-14
        if q >15:
            qstns = ExcaliburQuestion.objects.all()[q-16]
        if q ==15:
            q_no = 1
        if request.method=="POST":
            ques = ExcaliburQuestion.objects.all()[q-2]
            q_answer = request.POST['answer']
            if len(ExcaliburUserAnswer.objects.filter(user = user).filter(qstn = ques))==0:
                useranswer = ExcaliburUserAnswer(user=user, answer=q_answer, qstn=ques)
                useranswer.save()
                quescount = ExcaliburQuestionCount.objects.get(question=ques)
                quescount.count += 1
                quescount.save()
            else:
                quiz_obj = ExcaliburUserAnswer.objects.filter(user = user).filter(qstn = ques)[0]
                quiz_obj.answer = q_answer
                quiz_obj.save()      
    return render(request,'question_exc.html', {'matter':matter, 'qstns':qstns, 'q_no':q_no, 'q_back':q_back, 'q':q, 'q_tot':q_tot})


def submit(request):
    matter = ExcaliburInfo.objects.all()[0]
    user= request.user
    qstns = ExcaliburQuestion.objects.all()
    answersAll = ExcaliburUserAnswer.objects.filter(user = user)
    if len(answersAll)==0:
	    for q in qstns:
        	ques = q
            if request.method=="POST":
                if len(ExcaliburUserAnswer.objects.filter(user = user).filter(qstn = ques))==0:
                    answer = request.POST['answer'+str(q.id)]
                    mathanswer = mathUserAnswer(user=user, answer=answer, qstn=ques)
                    mathanswer.save()
    return render(request,'final_exc.html', {'qstns':qstns, 'matter':matter})
    
def exclogout(request):
    logout(request)
    matter = ExcaliburInfo.objects.all()[0]
    excaliburinfos = ExcaliburInfo.objects.all()
    return HttpResponseRedirect("/excalibur")
