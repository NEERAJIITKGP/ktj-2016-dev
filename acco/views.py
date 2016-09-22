from django.contrib.auth import logout
from django.http.response import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.shortcuts import render,redirect
from models import * 
from event.models import Event, Genre
from myktj.models import *
from django.utils.datetime_safe import datetime
from django.utils.http import urlquote
from myktj.models import event_reg
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.cache import never_cache
import urllib
import json
# import logger

def accomodate(request):
    user=request.user
    new=False
    error=''
    error1=''
    try:
        if( request.GET['error'] is not None):
            error='All Fields are Mandatory'
    except:
        pass
    try:
        if( request.GET['error1'] is not None):
            error1='All Fields are Mandatory'
    except:
        pass
    try:
        profile=Profile.objects.get(user=user)
    except Exception as e:
        return redirect('/accounts/msignin')
    try:
        acco=accomodation.objects.get(user=user)
        new=False
    except:
        name=user.first_name+" "+user.last_name
        acco=accomodation()
        acco.user=user
        acco.name=name
        acco.institution=profile.institute.institute
        acco.year=profile.year
        acco.mobile=""
        acco.status = 0
        acco.payment_status = 0
        new=True

    try:
        dacco=draftaccomodation.objects.get(user=user)
        dnew=False
    except:
        name=user.first_name+" "+user.last_name
        dacco=draftaccomodation()
        dacco.user=user
        dacco.name=name
        dacco.institution=profile.institute.institute
        dacco.year=profile.year
        dacco.mobile=""
        dacco.bank=""
        dacco.draft=""
        dacco.draft_date="2015-01-01"
        dacco.status = 0
        dnew=True
    context={'acco':acco,'new':new,'dacco':dacco,'dnew':dnew,'error':error,'error1':error1,'userid':user}
    return render(request,'acco.html',context)

def guide(request):
    return render(request,'guide.html')

def success(request):
    user=request.user
    try:
        profile=Profile.objects.get(user=user)
    except Exception as e:
        return HttpResponse("Please Login to register for Accomodation")
    acco=accomodation.objects.get(user=user)
    acco.payment_status = 1
    acco.save()
    return render(request,'asuccess.html')
        
def draftsuccess(request):
    user = request.user
    try:
        profile=Profile.objects.get(user=user)
    except Exception as e:
        return HttpResponse("Please Login to register for Accomodation")
    acco = draftaccomodation.objects.get(user=user)
    acco.status = 0
    acco.save()
    return render(request, 'dsuccess.html')
 
def save(request):
    user=request.user
    try:
        profile=Profile.objects.get(user=user)
    except Exception as e:
        return HttpResponse("Please Login to register for Accomodation")
    try:
        acco=accomodation.objects.get(user=user)
    except:
        acco=accomodation()
        acco.status=0
        acco.payment_status=0
    
    
    acco.name=request.POST['name']
    acco.institution=request.POST['institution']
    acco.year=request.POST['year']
    acco.mobile=request.POST['mobile']
    acco.pnr=request.POST['pnr']
    acco.train=request.POST['train']
    acco.arrival=request.POST['arrivaldate']
    acco.departure=request.POST['departuredate']
    acco.draft=''
    acco.bank=''
    acco.draft_date=''
    acco.user=user
    print(acco)
    if acco.is_finalist():
            acco.status=1
    if(acco.name!="" and acco.institution!="" and acco.year!=""  and acco.mobile!="" is not None):
        acco.save()
        if acco.payment_status == 0 :
            sname = acco.name
            sid = acco.user.id
            smail = acco.user.email
            url = 'https://www.townscript.com/e/kshitij-iitkgp/booking?accommodation=1&name='+ str(sname) + '&emailid='+ str(smail) +'&cq1='+ str(sid)
            print url
            return redirect(url)
        else:
            return redirect('/acco', permanent=True)
    else:
        return redirect('/acco?error=1', permanent=True)

def draftsave(request):
    user=request.user
    try:
        profile=Profile.objects.get(user=user)
    except Exception as e:
        return HttpResponse("Please Login to register for Accomodation")
    try:
        acco=draftaccomodation.objects.get(user=user)
    except:
        acco=draftaccomodation()
        acco.status=0
    
    
    acco.name=request.POST['name']
    acco.institution=request.POST['institution']
    acco.year=request.POST['year']
    acco.bank=request.POST['bank']
    acco.draft=request.POST['draft']
    acco.draft_date=request.POST['draftdate']
    acco.mobile=request.POST['mobile']
    acco.pnr=request.POST['pnr']
    acco.train=request.POST['train']
    acco.arrival=request.POST['arrivaldate']
    acco.departure=request.POST['departuredate']
    acco.user=user
    print(acco)
    if acco.is_finalist():
            acco.status=1
    if(acco.name!="" and acco.institution!="" and acco.year!="" and acco.bank!="" and acco.draft!="" and  acco.draft_date is not None and acco.mobile!="" is not None):
        acco.save()
        
        return redirect('/acco/draftsuccess', permanent=True)
    else:
        return redirect('/acco?error1=1', permanent=True)
        
def validateFinalists(request):
    accousers = accomodation.objects.all()
    for w in accousers:
        if w.status == 0:
            w.status = 1
            w.save()
    return HttpResponseRedirect('/accoAdmin?view=user&p=1')


def notifications(request):
    received_json_data=json.loads(request.body)
    pay = payment()
    usr = received_json_data['data']['customQuestion1']
    user = User.objects.get(id=usr)
    pay.user = user
    pay.email = received_json_data['data']['userEmailId']
    pay.orderid = received_json_data['data']['uniqueOrderId']
    pay.registrationstamp = received_json_data['data']['registrationTimestamp']
    pay.save()
    return HttpResponse("OK")

def insert(request):
    i = 0
    accousers = accomodation.objects.all()
    for acco in accousers:
        user = acco.user
        try:
            spot = accospot.objects.get(user=user)
        except:
            spot = accospot()
            spot.status = 0
        acno = 'KTJACCO'
        spot.user = user
        acno += str(user.id) + str(acco.id)
        print acno
        spot.acno = acno
        
        spot.save()
        i += 1
    return HttpResponse(i)

def insertdraft(request):
    i = 0
    accousers = draftaccomodation.objects.all()
    for acco in accousers:
        user = acco.user
        try:
            spot = accospot.objects.get(user=user)
        except:
            spot = accospot()
            spot.status = 0
        acno = 'KTJACCO'
        spot.user = user
        acno += str(user.id) + str(acco.id)
        print acno
        spot.acno = acno
        
        spot.save()
        i += 1
    return HttpResponse(i)

