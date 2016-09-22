from django.shortcuts import render,redirect
from models import *
from acco.models import *
from django.http.response import HttpResponse
from django.utils.datetime_safe import datetime
from django.utils import timezone
from datetime import datetime
from preference.models import Preference



def index(request):
	if request.user.is_authenticated():
		user=request.user
		if accomodation.objects.filter(user=user):
			return render(request,'preference.html',{'error1':0})
		else:
			return HttpResponse('You are not registered for accomodation')			
	else:
		return HttpResponse('You are not loggedin <a href="https://ktj.in/"> Login </a> First')	 	
 	
def save(request):

  user=request.user
  exist = Preference.objects.filter(user=user)
  err=0
  if len(exist)>0:
  	err=1
  	return render(request, 'preference.html',{'error1':err})

  else: 

  	for i in range(1, 10):
  		for j in range(i+1,11):
  			k='pref_'+str(i)
  			l='pref_'+str(j)
  			if(request.POST.get(k)==request.POST.get(l)):
					return render(request, 'preference.html',{'error1':2})
  				
	if request.method == "POST":
		pref_1=request.POST.get('pref_1')
		pref_2=request.POST.get('pref_2')
		pref_3=request.POST.get('pref_3')
		pref_4=request.POST.get('pref_4')
		pref_5=request.POST.get('pref_5')
		pref_6=request.POST.get('pref_6')
		pref_7=request.POST.get('pref_7')
		pref_8=request.POST.get('pref_8')
		pref_9=request.POST.get('pref_9')
		pref_10=request.POST.get('pref_10')
		pref_11=request.POST.get('pref_11')
		time = timezone.now()

		pref = Preference(user=user, pref_1=pref_1, pref_2=pref_2, pref_3=pref_3, pref_4=pref_4, pref_5=pref_5, pref_6=pref_6, pref_7=pref_7, pref_8=pref_8, pref_9=pref_9, pref_10=pref_10, pref_11=pref_11, time=time)
		pref.save()
		return render(request, 'preference.html',{'error1':3})
	else:
		return render(request, 'preference.html',{'error1':4})