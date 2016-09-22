from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from random import randrange
from workshop9.models import *
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView
from workshop9.forms import *
from django.contrib.auth import logout
import json
import datetime# Create your views here.


class LoginView(FormView):
    template_name = "workshop9/login.html"
    form_class = LoginForm
    
    def get_success_url(self):
        return '/workshop9/login'

    def get_context_data(self, **kwargs):
        context = super(LoginView, self).get_context_data(**kwargs)
        return context
    
    def form_valid(self, form):
        success_url = self.get_success_url()
        return form.login(self.request, redirect_url = success_url)

login = LoginView.as_view()

def Index(request,name):
    if request.user.is_authenticated():
        template='workshop9/register.html'
        cntxt={'username':request.user.first_name+' '+request.user.last_name,'workshopname':name,'ur':'workshop8/work_ktj_897340'}
        work_name=name
        if not work_regt9.objects.filter(user=request.user,workshop=name).exists():
            timenow=datetime.datetime.now()
            work_re= work_regt9 .objects.create( user=request.user,workshop=work_name,time_work=timenow)
            work_re.save()
            
    else:
        return login (request)   
    return render(request,template,cntxt)     
    

def work9(request):
    return Index(request,'Bajaj Capital - The Art of Wealth Creation')



def logout_workshop(request):
    logout(request)
    return redirect('/workshop9/login')
    