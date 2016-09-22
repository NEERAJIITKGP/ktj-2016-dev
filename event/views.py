from django.shortcuts import render, redirect
from django.http import HttpResponse
from myktj.models import *
from event.models import *
from django.contrib.auth.models import User

# --------------------- Event Registration ---------------------

def register (request):
    numb=request.GET['id']
    usr=request.user.pk
    if  usr == None:
        return HttpResponse("<body>Please Login First</body>")
    try :
        r=event_reg.objects.get(user=usr,event=Event.objects.get(id=numb))
    except:
        r=event_reg(user=User.objects.get(id=usr),event=Event.objects.get(id=numb))
        r.save()
        return HttpResponse("<body>You are successfully registered</body>")
    return HttpResponse("<body>Already Registered</body>")

# --------------------- Kolkata Workshop Registration ---------------------

def register_w (request):
    usr=request.user.pk
    if  usr == None:
        return HttpResponse("Please Login First")
    try : 
        k=KolkataWorkshop.objects.get(user=User.objects.get(id=usr))
    except:
        k=KolkataWorkshop(user=User.objects.get(id=usr))
        k.save()
        return HttpResponse("You are successfully registered")
    return HttpResponse("Already Registered. ")
# --------------------- Workshops Registration ---------------------

def workreg (request):
    usr=request.user.pk
    workshop=Workshop.objects.get(id=request.GET['id'])
    if  usr == None:
        return HttpResponse("<body>Please Login First</body>")
    try : 
        k=WorkshopReg.objects.get(user=usr,workshop=workshop)
    except:
        k=WorkshopReg(user=User.objects.get(id=usr),workshop=workshop)
        k.save()
        return HttpResponse("<body>You are successfully registered</body>")
    return HttpResponse("<body>Already Registered</body> ")
    
# --------------------- Social Initiative  Registration ---------------------

def register_s (request):
    usr=request.user.pk
    if  usr == None:
        return HttpResponse("Please Login First")
    try : 
        i=Initiative.objects.get(user=User.objects.get(id=usr))
    except:
        i=Initiative(user=User.objects.get(id=usr))
        i.save()
        return HttpResponse("You are successfully registered")
    return HttpResponse("Already Registered. ")
# --------------------- Registration Detail Portals ---------------------

def pro(self):
    self.name=''
    self.state=''
    self.mobile=''
    self.email=''
    self.institute=''
    self.event=Event


def iccreg (request):
    user=request.user.username
    if user=='bclub':
        genr=Genre.objects.get(id='7')
        events=Event.objects.filter(id='38')
        profiles=[]
        out=''
        i=0
        for eve in events:
            out+=eve.name+': <br><table>'
            a=event_reg.objects.filter(event=eve)
            count=1
            for b in a:
                profile=Profile.objects.get(user=b.user)
                prof=pro
                prof.name=b.user.first_name+' '+b.user.last_name
                prof.state=profile.state.state
                prof.mobile=profile.contact
                prof.institute=profile.institute.institute
                prof.email=b.user.email
                prof.event=eve.name
                profiles+=[prof]
                out+='<tr><td>'+`count`+'</td><td>'+prof.name+'</td><td>'+prof.email+'</td><td>'+prof.institute+'</td><td>'+prof.state+'</td><td>'+prof.mobile+'</td></tr>'
                count+=1
            out+='</table><br><br><br>'
            i+=1
        cntxt={
            'events' : events,
            'profiles' : profiles,
        }
        return HttpResponse(out)
    else:
        return redirect('/')
        #return render(request,'roboreg.html',cntxt);

def tireg(request):
    workshops = Workshop.objects.filter(id=request.GET['work'])
    profiles=[]
    out=''
    i=0
    for work in workshops:
        out+=work.name+': <br><table>'
        a=WorkshopReg.objects.filter(workshop=work)
        count=1
        for b in a:
            #profile=Profile.objects.get(user=b.user)
            prof=pro
            prof.name=b.user.first_name+' '+b.user.last_name
            #prof.state=profile.state.state
            #prof.mobile=profile.contact
            #prof.institute=profile.institute.institute
            prof.email=b.user.email
           
            profiles+=[prof]
            out+='<tr><td>'+`count`+'</td><td>'+prof.name+'</td><td>'+prof.email+'</td></tr>'
            count+=1
        out+='</table><br><br><br>'
        i+=1
    return HttpResponse(out)

def roboreg (request):
    user=request.user.username
    if user=='robotix':
        if (request.method == 'GET'):
            sample = ''
            if 'event' in request.GET:      
                if (request.GET['event'] == 'summit'):
                        genr=Genre.objects.get(id='7')
                        events=Event.objects.filter(id='53')
                        profiles=[]
                        out=''
                        i=0
                        for eve in events:
                            out+=eve.name+': <br><table>'
                            a=event_reg.objects.filter(event=eve)
                            count=1
                            for b in a:
                                profile=Profile.objects.get(user=b.user)
                                prof=pro
                                prof.username=b.user.username
                                prof.name=b.user.first_name+' '+b.user.last_name
                                prof.state=profile.state.state
                                prof.mobile=profile.contact
                                prof.institute=profile.institute.institute
                                prof.email=b.user.email
                                prof.event=eve.name
                                profiles+=[prof]
                                out+='<tr><td>'+`count`+'</td><td>'+prof.username+'</td><td>'+prof.name+'</td><td>'+prof.email+'</td><td>'+prof.institute+'</td><td>'+prof.state+'</td><td>'+prof.mobile+'</td></tr>'
                                count+=1
                            out+='</table><br><br><br>'
                            i+=1
                        cntxt={
                            'events' : events,
                            'profiles' : profiles,
                        }
                        return HttpResponse(out)

                elif (request.GET['event'] == 'warehouse'):
                        genr=Genre.objects.get(id='7')
                        events=Event.objects.filter(id='54')
                        profiles=[]
                        out=''
                        i=0
                        for eve in events:
                            out+=eve.name+': <br><table>'
                            a=event_reg.objects.filter(event=eve)
                            count=1
                            for b in a:
                                profile=Profile.objects.get(user=b.user)
                                prof=pro
                                prof.username=b.user.username
                                prof.name=b.user.first_name+' '+b.user.last_name
                                prof.state=profile.state.state
                                prof.mobile=profile.contact
                                prof.institute=profile.institute.institute
                                prof.email=b.user.email
                                prof.event=eve.name
                                profiles+=[prof]
                                out+='<tr><td>'+`count`+'</td><td>'+prof.username+'</td><td>'+prof.name+'</td><td>'+prof.email+'</td><td>'+prof.institute+'</td><td>'+prof.state+'</td><td>'+prof.mobile+'</td></tr>'
                                count+=1
                            out+='</table><br><br><br>'
                            i+=1
                        cntxt={
                            'events' : events,
                            'profiles' : profiles,
                        }
                        return HttpResponse(out)

                elif (request.GET['event'] == 'sherlock'):
                        genr=Genre.objects.get(id='7')
                        events=Event.objects.filter(id='52')
                        profiles=[]
                        out=''
                        i=0
                        for eve in events:
                            out+=eve.name+': <br><table>'
                            a=event_reg.objects.filter(event=eve)
                            count=1
                            for b in a:
                                profile=Profile.objects.get(user=b.user)
                                prof=pro
                                prof.username=b.user.username
                                prof.name=b.user.first_name+' '+b.user.last_name
                                prof.state=profile.state.state
                                prof.mobile=profile.contact
                                prof.institute=profile.institute.institute
                                prof.email=b.user.email
                                prof.event=eve.name
                                profiles+=[prof]
                                out+='<tr><td>'+`count`+'</td><td>'+prof.username+'</td><td>'+prof.name+'</td><td>'+prof.email+'</td><td>'+prof.institute+'</td><td>'+prof.state+'</td><td>'+prof.mobile+'</td></tr>'
                                count+=1
                            out+='</table><br><br><br>'
                            i+=1
                        cntxt={
                            'events' : events,
                            'profiles' : profiles,
                        }
                        return HttpResponse(out)

                elif (request.GET['event'] == 'sheldon'):
                        genr=Genre.objects.get(id='7')
                        events=Event.objects.filter(id='51')
                        profiles=[]
                        out=''
                        i=0
                        for eve in events:
                            out+=eve.name+': <br><table>'
                            a=event_reg.objects.filter(event=eve)
                            count=1
                            for b in a:
                                profile=Profile.objects.get(user=b.user)
                                prof=pro
                                prof.username=b.user.username
                                prof.name=b.user.first_name+' '+b.user.last_name
                                prof.state=profile.state.state
                                prof.mobile=profile.contact
                                prof.institute=profile.institute.institute
                                prof.email=b.user.email
                                prof.event=eve.name
                                profiles+=[prof]
                                out+='<tr><td>'+`count`+'</td><td>'+prof.username+'</td><td>'+prof.name+'</td><td>'+prof.email+'</td><td>'+prof.institute+'</td><td>'+prof.state+'</td><td>'+prof.mobile+'</td></tr>'
                                count+=1
                            out+='</table><br><br><br>'
                            i+=1
                        cntxt={
                            'events' : events,
                            'profiles' : profiles,
                        }
                        return HttpResponse(out)
                elif (request.GET['event'] == 'droidblitz'):
                        genr=Genre.objects.get(id='7')
                        events=Event.objects.filter(id='36')
                        profiles=[]
                        out=''
                        i=0
                        for eve in events:
                            out+=eve.name+': <br><table>'
                            a=event_reg.objects.filter(event=eve)
                            count=1
                            for b in a:
                                profile=Profile.objects.get(user=b.user)
                                prof=pro
                                prof.username=b.user.username
                                prof.name=b.user.first_name+' '+b.user.last_name
                                prof.state=profile.state.state
                                prof.mobile=profile.contact
                                prof.institute=profile.institute.institute
                                prof.email=b.user.email
                                prof.event=eve.name
                                profiles+=[prof]
                                out+='<tr><td>'+`count`+'</td><td>'+prof.username+'</td><td>'+prof.name+'</td><td>'+prof.email+'</td><td>'+prof.institute+'</td><td>'+prof.state+'</td><td>'+prof.mobile+'</td></tr>'
                                count+=1
                            out+='</table><br><br><br>'
                            i+=1
                        cntxt={
                            'events' : events,
                            'profiles' : profiles,
                        }
                        return HttpResponse(out)
                
            else :
                    
                    return HttpResponse("No Event parameter passed")
        else :
            return HttpResponse("No get request found")
    else:
        return HttpResponse("Please login")

# --------------------- Digital India  Registration ---------------------

def register_digital (request):
    usr=request.user.pk
    if  usr == None:
        return HttpResponse("Please Login First")
    try : 
        k=DigitalIndia.objects.get(user=User.objects.get(id=usr))
    except:
        k=DigitalIndia(user=User.objects.get(id=usr))
        k.save()
        return HttpResponse("You are successfully registered")
    return HttpResponse("Already Registered. ")

def register_digitalworkshop (request):
    usr=request.user.pk
    if  usr == None:
        return HttpResponse("Please Login First")
    try : 
        k=DigitalIndiaWorkshop.objects.get(user=User.objects.get(id=usr))
    except:
        k=DigitalIndiaWorkshop(user=User.objects.get(id=usr))
        k.save()
        return HttpResponse("You are successfully registered")
    return HttpResponse("Already Registered. ")

# --------------------- Sankalp Registration ---------------------

def register_sankalp (request):
    usr=request.user.pk
    if  usr == None:
        return HttpResponse("Please Login First")
    try : 
        k=Sankalp.objects.get(user=User.objects.get(id=usr))
    except:
        k=Sankalp(user=User.objects.get(id=usr))
        k.save()
        return HttpResponse("You are successfully registered")
    return HttpResponse("Already Registered. ")
#-------------blockchain Registration-----------
def register_blockchain (request):
    usr=request.user.pk
    if  usr == None:
        return HttpResponse("Please Login First")
    try : 
        k=Blockchain.objects.get(user=User.objects.get(id=usr))
    except:
        k=Blockchain(user=User.objects.get(id=usr))
        k.save()
        return HttpResponse("You are successfully registered")
    return HttpResponse("Already Registered. ")
