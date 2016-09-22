import hashlib
import user
from blockchain.models import roboreg
from myktj import *
from django.template import RequestContext
from django.template import Context, Template,RequestContext
from django.core.context_processors import csrf
from blockchain.models import *
import datetime
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpRequest, Http404
from django.conf import settings
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from myktj.models import Profile
from payu.forms import PayUForm, HashForm
from payu.utils import verify_hash, generate_hash
from blockchain.forms import OrderForm
from uuid import uuid4
from random import randint


def index(request):
    return render(request, 'static/blockchain/index.html')




def kolkata(request):
    return checkout(request, 'Kolkata')


def bhubneswar(request):
    return checkout(request, 'Bhubneswar')


def indore(request):
    return checkout(request, 'Indore')


def allahabad(request):
    return checkout(request, 'Allahabad')


def hyderabad(request):
    return checkout(request, 'Hyderabad')


def kanpur(request):
    return checkout(request, 'Kanpur')


def lucknow(request):
    return checkout(request, 'Lucknow')


def raipur(request):
    return checkout(request, 'Raipur')


def rourkela(request):
    return checkout(request, 'Rourkela')

@csrf_protect
@csrf_exempt
def checkout(request,name):
    user=request.user
    try:
        profile=Profile.objects.get(user=user)
    except:
          profile=Profile()
    try:
        rob=roboreg.objects.get(user=user)
    except:
        rob=roboreg()






    if rob.payment_status=='failure':
            if request.user.is_authenticated():
                    if request.method == 'POST':
                            cntxt = {'username': request.user.first_name + ' ' + request.user.last_name, 'cityname': name}
                            city_name = name
                            if not roboreg.objects.filter(user=request.user, city=name).exists():
                                timenow = datetime.datetime.now()
                                robo_reg = roboreg.objects.create(user=request.user, city=city_name, time_work=timenow)
                                robo_reg.firstname=request.user.first_name
                                robo_reg.lastname=request.user.last_name
                                robo_reg.contact=profile.contact
                                robo_reg.save()





                            order_form = OrderForm(request.POST)
                            if order_form.is_valid():
                                            initial = order_form.cleaned_data
                                            initial.update({'key': settings.PAYU_INFO['merchant_key'],
                                                            'surl': request.build_absolute_uri(reverse('order.success')),
                                                            'furl': request.build_absolute_uri(reverse('order.failure')),
                                                            'curl': request.build_absolute_uri(reverse('order.cancel'))})
                                            # Once you have all the information that you need to submit to payu
                                            # create a payu_form, validate it and render response using
                                            # template provided by PayU.
                                            payu_form = PayUForm(initial)
                                            if payu_form.is_valid():
                                                context = {'form': payu_form,
                                                           'hash_form': HashForm({'hash': generate_hash(payu_form.cleaned_data)}),
                                                           'action': "%s" % settings.PAYU_INFO['payment_url']}
                                                return render(request, 'payu_form.html', context)
                                            else:
                                                return HttpResponse(status=500)
                    else:
                                        initial = {'txnid': uuid4().hex,
                                                   'productinfo': 'Workshop ticket',
                                                   'amount': 400,
                                                   'firstname':request.user.first_name,
                                                   'lastname':request.user.last_name,
                                                   'email':request.user.email,
                                                    'phone':profile.contact,
                                                    'address1':profile.address,
                                                   'address2':profile.address,
                                                    'city':name,
                                                    'state':profile.state,
                                                    'country':profile.country,
                                                   'service_provider':'payu_paisa',

                                                   }
                                        order_form = OrderForm(initial=initial)
                    context = {'form': order_form}
                    return render(request, 'checkout.html', context)
            else:
                return redirect('/accounts/msignin')
    else:
        return render_to_response('success1.html',
                              RequestContext(request, { "status": 'success','txnid':rob.txnid, 'city':name}, ))
@csrf_protect
@csrf_exempt
def success(request):
    user=request.user
    if request.method == 'POST':
        if not verify_hash(request.POST):
            return redirect('order.failure')
        else:
           status = request.POST["status"]
           txnid = request.POST["txnid"]
           robo_reg=roboreg.objects.get(user=user)
           robo_reg.payment_status = status
           robo_reg.txnid = txnid
           robo_reg.save()

           firstname = request.POST["firstname"]
           amount = request.POST["amount"]

           posted_hash = request.POST["hash"]
           key = request.POST["key"]
           productinfo = request.POST["productinfo"]
           email = request.POST["email"]
        return render_to_response('success.html',
                              RequestContext(request, {"txnid": txnid, "status": status, "amount": amount,"city":robo_reg.city}))
    else:
        raise Http404

@csrf_protect
@csrf_exempt
def failure(request):
    user=request.user
    try:
        robo_reg=roboreg.objects.get(user=user)
    except:
        robo_reg=roboreg()
    if request.method == 'POST':
           status = request.POST["status"]
           robo_reg.payment_status = status
           robo_reg.save()

           firstname = request.POST["firstname"]
           amount = request.POST["amount"]
           txnid = request.POST["txnid"]
           posted_hash = request.POST["hash"]
           key = request.POST["key"]
           productinfo = request.POST["productinfo"]
           email = request.POST["email"]
           return render_to_response('failure.html',
                              RequestContext(request, {"txnid": txnid, "status": status}))

    else:
         raise Http404

@csrf_protect
@csrf_exempt
def cancel(request):
    if request.method == 'POST':
        return render(request, 'cancel.html')
    else:
        raise Http404