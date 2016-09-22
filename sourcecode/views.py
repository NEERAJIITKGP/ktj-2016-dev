from django.shortcuts import render, redirect
from django.views.generic.edit import FormView
from django.http.response import HttpResponse, HttpResponseRedirect, Http404
from django.views.decorators.csrf import csrf_exempt
from event.models import *
from journal.models import *
from myktj.models import *
from sponsor.models import *
from myktj.forms import *
from sourcecode.models import *
from datetime import timedelta,datetime
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache


def sourcecode(request ):
  user=request.user
  if user.groups.filter(name='sourcecode').exists():
    if len(SourcecodeUser.objects.filter(user = user))==0:
        play = SourcecodeUser (user=user)
        play.save()
    if len(Sourcecode.objects.filter(user = user))==0:
        play = Sourcecode (user=user)
        play.save()
    
    #if len(timestart)>0:
     #   return HttpResponseRedirect('/sourcecode/start1')
    return render(request,'sourcecode.html')
  else:
    return HttpResponse("Not authorised to view the page")

@never_cache
def sourcecodestart1 (request):
  user = request.user

  if user.groups.filter(name='sourcecode').exists():
    answersAll = Sourcecode.objects.filter(user = user)
  
    
    bid= Sourcecode.objects.filter(user = user)[0]
    gamestatus = SourcecodeUser.objects.filter(user = user)[0]
    if bid.clickquestion1==0:
    	
        firstclick = datetime.now()
        minremain = 00
        secremain = 00
        Sourcecode.objects.filter(user = user).update(clickquestion1=1)
        SourcecodeUser.objects.filter(user = user).update(last_played=firstclick)
    #if len(answersAll)>0:
        #return HttpResponseRedirect('/sourcecode/start1')
    if gamestatus.gameover == 1:
        return HttpResponseRedirect('/sourcecode/done')
    if len(SourcecodeUser.objects.filter(user = user))>0:
        playstart = SourcecodeUser.objects.filter(user = user)[0]
        if playstart.last_played > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            if(bid.bid1==1):
              return render(request, 'sourcecodestart1.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
            else :
              return render(request, 'sourcecodestart1.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
        else:
            playstart.gameover = 1
            playstart.save()
            return HttpResponseRedirect('/sourcecode/success')
    gamestatus.gameover = 1
    gamestatus.save()
    if(bid.bid1==1):
      return render(request,'sourcecodestart1.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
    else :
      return render(request, 'sourcecodestart1.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
  else:
    return HttpResponse("Not authorised to view the page")
@never_cache
def sourcecodestart2 (request):
  user = request.user

  if user.groups.filter(name='sourcecode').exists():
    answersAll = Sourcecode.objects.filter(user = user)
  
    
    bid= Sourcecode.objects.filter(user = user)[0]
    gamestatus = SourcecodeUser.objects.filter(user = user)[0]
    if bid.clickquestion2==0:
    	
        firstclick = datetime.now()
        minremain = 00
        secremain = 00
        Sourcecode.objects.filter(user = user).update(clickquestion2=1)
        SourcecodeUser.objects.filter(user = user).update(last_played2=firstclick)
    #if len(answersAll)>0:
        #return HttpResponseRedirect('/sourcecode/start1')
    if gamestatus.gameover2 == 1:
        return HttpResponseRedirect('/sourcecode/done')
    if len(SourcecodeUser.objects.filter(user = user))>0:
        playstart = SourcecodeUser.objects.filter(user = user)[0]
        if playstart.last_played2 > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played2
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            if(bid.bid2==1):
              return render(request, 'sourcecodestart2.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
            else :
              return render(request, 'sourcecodestart2.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
        else:
            playstart.gameover2 = 1
            playstart.save()
            return HttpResponseRedirect('/sourcecode/success')
    gamestatus.gameover2 = 1
    gamestatus.save()
    if(bid.bid2==1):
      return render(request,'sourcecodestart2.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
    else :
      return render(request, 'sourcecodestart2.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
  else:
    return HttpResponse("Not authorised to view the page")
@never_cache
def sourcecodestart3 (request):
  user = request.user

  if user.groups.filter(name='sourcecode').exists():
    answersAll = Sourcecode.objects.filter(user = user)
  
    
    bid= Sourcecode.objects.filter(user = user)[0]
    gamestatus = SourcecodeUser.objects.filter(user = user)[0]
    if bid.clickquestion3==0:
    	
        firstclick = datetime.now()
        minremain = 00
        secremain = 00
        Sourcecode.objects.filter(user = user).update(clickquestion3=1)
        SourcecodeUser.objects.filter(user = user).update(last_played3=firstclick)
    #if len(answersAll)>0:
        #return HttpResponseRedirect('/sourcecode/start1')
    if gamestatus.gameover3 == 1:
        return HttpResponseRedirect('/sourcecode/done')
    if len(SourcecodeUser.objects.filter(user = user))>0:
        playstart = SourcecodeUser.objects.filter(user = user)[0]
        if playstart.last_played3 > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played3
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            if(bid.bid3==1):
              return render(request, 'sourcecodestart3.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
            else :
              return render(request, 'sourcecodestart3.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
        else:
            playstart.gameover3 = 1
            playstart.save()
            return HttpResponseRedirect('/sourcecode/success')
    gamestatus.gameover3 = 1
    gamestatus.save()
    if(bid.bid3==1):
      return render(request,'sourcecodestart3.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
    else :
      return render(request, 'sourcecodestart3.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
  else:
    return HttpResponse("Not authorised to view the page")
@never_cache
def sourcecodestart4 (request):
  user = request.user

  if user.groups.filter(name='sourcecode').exists():
    answersAll = Sourcecode.objects.filter(user = user)
  
    
    bid= Sourcecode.objects.filter(user = user)[0]
    gamestatus = SourcecodeUser.objects.filter(user = user)[0]
    if bid.clickquestion4==0:
    	
        firstclick = datetime.now()
        minremain = 00
        secremain = 00
        Sourcecode.objects.filter(user = user).update(clickquestion4=1)
        SourcecodeUser.objects.filter(user = user).update(last_played4=firstclick)
    #if len(answersAll)>0:
        #return HttpResponseRedirect('/sourcecode/start1')
    if gamestatus.gameover4 == 1:
        return HttpResponseRedirect('/sourcecode/done')
    if len(SourcecodeUser.objects.filter(user = user))>0:
        playstart = SourcecodeUser.objects.filter(user = user)[0]
        if playstart.last_played4 > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played4
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            if(bid.bid4==1):
              return render(request, 'sourcecodestart4.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
            else :
              return render(request, 'sourcecodestart4.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
        else:
            playstart.gameover4 = 1
            playstart.save()
            return HttpResponseRedirect('/sourcecode/success')
    gamestatus.gameover4 = 1
    gamestatus.save()
    if(bid.bid4==1):
      return render(request,'sourcecodestart4.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
    else :
      return render(request, 'sourcecodestart4.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
  else:
    return HttpResponse("Not authorised to view the page")
@never_cache
def sourcecodestart5 (request):
  user = request.user

  if user.groups.filter(name='sourcecode').exists():
    answersAll = Sourcecode.objects.filter(user = user)
  
    
    bid= Sourcecode.objects.filter(user = user)[0]
    gamestatus = SourcecodeUser.objects.filter(user = user)[0]
    if bid.clickquestion5==0:
    	
        firstclick = datetime.now()
        minremain = 00
        secremain = 00
        Sourcecode.objects.filter(user = user).update(clickquestion5=1)
        SourcecodeUser.objects.filter(user = user).update(last_played5=firstclick)
    #if len(answersAll)>0:
        #return HttpResponseRedirect('/sourcecode/start1')
    if gamestatus.gameover5 == 1:
        return HttpResponseRedirect('/sourcecode/done')
    if len(SourcecodeUser.objects.filter(user = user))>0:
        playstart = SourcecodeUser.objects.filter(user = user)[0]
        if playstart.last_played5 > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played5
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            if(bid.bid5==1):
              return render(request, 'sourcecodestart5.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
            else :
              return render(request, 'sourcecodestart5.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
        else:
            playstart.gameover5 = 1
            playstart.save()
            return HttpResponseRedirect('/sourcecode/success')
    gamestatus.gameover5 = 1
    gamestatus.save()
    if(bid.bid5==1):
      return render(request,'sourcecodestart5.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
    else :
      return render(request, 'sourcecodestart5.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
  else:
    return HttpResponse("Not authorised to view the page")
@never_cache
def sourcecodestart6 (request):
  user = request.user

  if user.groups.filter(name='sourcecode').exists():
    answersAll = Sourcecode.objects.filter(user = user)
  
    
    bid= Sourcecode.objects.filter(user = user)[0]
    gamestatus = SourcecodeUser.objects.filter(user = user)[0]
    if bid.clickquestion6==0:
    	
        firstclick = datetime.now()
        minremain = 00
        secremain = 00
        Sourcecode.objects.filter(user = user).update(clickquestion6=1)
        SourcecodeUser.objects.filter(user = user).update(last_played6=firstclick)
    #if len(answersAll)>0:
        #return HttpResponseRedirect('/sourcecode/start1')
    if gamestatus.gameover6 == 1:
        return HttpResponseRedirect('/sourcecode/done')
    if len(SourcecodeUser.objects.filter(user = user))>0:
        playstart = SourcecodeUser.objects.filter(user = user)[0]
        if playstart.last_played6 > timezone.now()-timedelta(minutes = 30):
            timeremain = timezone.now()-playstart.last_played6
            minremain = int((timeremain.seconds)/60)
            secremain = int((timeremain.seconds)%60)
            if(bid.bid6==1):
              return render(request, 'sourcecodestart6.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
            else :
              return render(request, 'sourcecodestart6.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
        else:
            playstart.gameover6 = 1
            playstart.save()
            return HttpResponseRedirect('/sourcecode/success')
    gamestatus.gameover6 = 1
    gamestatus.save()
    if(bid.bid6==1):
      return render(request,'sourcecodestart6.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':1})
    else :
      return render(request, 'sourcecodestart6.html', {'minremain':minremain,'points':bid.points, 'secremain':secremain,'start':0})
  else:
    return HttpResponse("Not authorised to view the page")
@never_cache
def sourcecodesuccess(request ):
  return render(request,'sourcecodesuccess.html')
@never_cache
def sourcecodedone(request ):
  return render(request,'sourcecodedone.html')
@never_cache
def sourcecodesubmit(request):
  user = request.user

  if user.groups.filter(name='sourcecode').exists():
    gamestatus = SourcecodeUser.objects.filter(user = user)[0]
    answersAll = Sourcecode.objects.filter(user = user)
    #if gamestatus.gameover == 1:
     #   return HttpResponseRedirect('/Sourcecode/done')
    playstart = SourcecodeUser.objects.filter(user = user)[0]
    bidded = Sourcecode.objects.filter(user = user)[0]

    
    if len(answersAll)==0:
        if request.method =="POST":
            v=request.POST.get('number')
            points = request.POST.get('points')
            bidded_points = int(bidded.points)
            newpoints =  bidded_points - int(points)
            if 0:
            	return redirect('https://www.codechef.com/')
            else:
	            if v=='1':
	            	if playstart.last_played > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid1:
                		return redirect('https://www.codechef.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question1=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid1=1)
	            	Sourcecodeanswer.save()
	            	return render(request, 'sourcecodestart1.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='2':
	            	if playstart.last_played2 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played2
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid2:
                		return redirect('https://www.codechef.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question2=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid2=1)
	            	Sourcecodeanswer.save()
	            	return render(request, 'sourcecodestart2.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='3':
	            	if playstart.last_played3 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played3
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid3:
                		return redirect('https://www.google.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question3=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid3=1)
	            	Sourcecodeanswer.save()
	            	return render(request, 'sourcecodestart3.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='4':
	            	if playstart.last_played4 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played4
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid4:
                		return redirect('https://www.google.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question4=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid4=1)
	            	Sourcecodeanswer.save()
	            	return render(request, 'sourcecodestart4.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='5':
	            	if playstart.last_played5 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played5
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid5:
                		return redirect('https://www.google.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question5=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid5=1)
	            	Sourcecodeanswer.save()
	            	return render(request, 'sourcecodestart5.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='6':
	            	if playstart.last_played6 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played6
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid6:
                		return redirect('https://www.google.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question6=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid6=1)
	            	Sourcecodeanswer.save()
	            	return render(request, 'sourcecodestart6.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
    else:
        if request.method =="POST":
            v=request.POST.get('number')
            points = request.POST.get('points')
            bidded_points = int(bidded.points)
            newpoints =  bidded_points - int(points)
            if 0:
            	return redirect('https://www.codechef.com/')
            else:
	            if v=='1':
	            	if playstart.last_played > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid1:
                		return redirect('https://www.codechef.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question1=points)
	            	Sourcecode.objects.filter(user = user).update(question1=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid1=1)
	            	return render(request, 'sourcecodestart1.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='2':
	            	if playstart.last_played2 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played2
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid2:
                		return redirect('https://www.codechef.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question2=points)
	            	Sourcecode.objects.filter(user = user).update(question2=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid2=1)
	            	return render(request, 'sourcecodestart2.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='3':
	            	if playstart.last_played3 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played3
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid3:
                		return redirect('https://www.codechef.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question3=points)
	            	Sourcecode.objects.filter(user = user).update(question3=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid3=1)
	            	return render(request, 'sourcecodestart3.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='4':
	            	if playstart.last_played4 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played4
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid4:	
                		return redirect('https://www.google.com/')
	            	Sourcecodeanswer = Sourcecode(user=user, question4=points)
	            	Sourcecode.objects.filter(user = user).update(question4=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid4=1)
	            	return render(request, 'sourcecodestart4.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='5':
	            	if playstart.last_played5 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played5
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid5:
                		return redirect('https://www.google.com/')
	            	Sourcecode.objects.filter(user = user).update(question5=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid5=1)
	            	return render(request, 'sourcecodestart5.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
	            elif v=='6':
	            	if playstart.last_played6 > timezone.now()-timedelta(minutes = 30):
        		        timeremain = timezone.now()-playstart.last_played6
        		        minremain = int((timeremain.seconds)/60)
        		        secremain = int((timeremain.seconds)%60)
    		        else :
    		            minremain=0
    		            secremain=0
	            	if bidded.bid6:
                		return redirect('https://www.google.com/')
	            	Sourcecode.objects.filter(user = user).update(question6=points)
	            	Sourcecode.objects.filter(user = user).update(points=newpoints, bid6=1)
	            	return render(request, 'sourcecodestart6.html', {'minremain':minremain,'points':bidded.points, 'secremain':secremain,'start':1})
  else:
    return HttpResponse("Not authorised to view the page")
