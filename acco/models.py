from django.db import models
from django.contrib.auth.models import User
from event.models import Event
from django import forms
from myktj.models import *


class accomodation(models.Model):
    user=models.OneToOneField(User)
    name=models.CharField(max_length=100)
    institution=models.TextField()
    year=models.IntegerField()
    mobile=models.CharField(max_length=12)
    bank=models.CharField(max_length=100,blank=True)
    draft=models.TextField(blank=True)
    draft_date=models.CharField(max_length=100,blank=True)
    pnr=models.CharField(max_length=10,blank=True)
    train=models.CharField(max_length=20,blank=True)
    arrival=models.DateField()
    departure=models.DateField()
    status=models.IntegerField()
    payment_status=models.IntegerField()
    
    def is_finalist(self):
        if(len(self.user.finalist_set.all())!=0):
            return True
        else:
            return False
    is_finalist.boolean=True
    
    def approval_status(self):
        return self.status==1
    
    approval_status.boolean=True

    def payment_pstatus(self):
        return self.payment_status==1
    
    payment_pstatus.boolean=True
        
    def __unicode__(self):
        return self.name
    
    def reg_events(self):
        Regevents = event_reg.objects.filter(user=self.user)
        out=''
        for Revent in Regevents:
            out+=Revent.event.name+', '
        return out
            
    def gender(self):
        geder = Profile.objects.filter(user=self.user)
        out=''
        for gender in geder:
            out+=gender.gender
        return out
    
    def fname(self):
        return self.user.first_name+' '+self.user.last_name
    
    def state(self):
        geder = Profile.objects.filter(user=self.user)
        out=''
        for state in geder:
            out+=state.state.state
        return out
    
    
    def mail(self):
        return self.user.email
        
    
class draftaccomodation(models.Model):
    user=models.OneToOneField(User)
    name=models.CharField(max_length=100)
    institution=models.TextField()
    year=models.IntegerField()
    bank=models.CharField(max_length=100)
    draft=models.TextField()
    draft_date=models.CharField(max_length=100)
    mobile=models.CharField(max_length=12)
    pnr=models.CharField(max_length=10,blank=True)
    train=models.CharField(max_length=20,blank=True)
    arrival=models.DateField()
    departure=models.DateField()
    status=models.IntegerField()
    
    def is_finalist(self):
        if(len(self.user.finalist_set.all())!=0):
            return True
        else:
            return False
    is_finalist.boolean=True
    
    def approval_status(self):
        return self.status==1
    
    approval_status.boolean=True
        
    def __unicode__(self):
        return self.name
    
    def reg_events(self):
        Regevents = event_reg.objects.filter(user=self.user)
        out=''
        for Revent in Regevents:
            out+=Revent.event.name+', '
        return out
            
    def gender(self):
        geder = Profile.objects.filter(user=self.user)
        out=''
        for gender in geder:
            out+=gender.gender
        return out
    
    def fname(self):
        return self.user.first_name+' '+self.user.last_name
    
    def state(self):
        geder = Profile.objects.filter(user=self.user)
        out=''
        for state in geder:
            out+=state.state.state
        return out
    
    
    def mail(self):
        return self.user.email


class payment(models.Model):
    user = models.ForeignKey(User)
    email = models.CharField(max_length=100)
    orderid = models.CharField(max_length=100)
    registrationstamp = models.CharField(max_length=100)


class finalist(models.Model):
    user = models.ForeignKey(User)
    event = models.ForeignKey(Event)
    def acco_portal(self):
        if(accomodation.objects.filter(user=self.user)):
            return True
        else:
            return False
    def draftacco_portal(self):
        if(draftaccomodation.objects.filter(user=self.user)):
            return True
        else:
            return False
    def insti (self):
	return self.user.profile.institute
    def name (self):
	return self.user.first_name+' '+self.user.last_name
    def contact(self):
	return self.user.profile.contact
    def acco_status(self):
        if ( not self.acco_portal()):
            return -1
        else:
            if (accomodation.objects.get(user=self.user).status==1):
   	    	   return "accepted"
            if (accomodation.objects.get(user=self.user).status==0):
		       return "pending"
    	    else:
      		    return "rejected"
    acco_portal.boolean=True

    def draftacco_status(self):
        if ( not self.draftacco_portal()):
            return -1
        else:
            if (draftaccomodation.objects.get(user=self.user).status==1):
                return "accepted"
            if (draftaccomodation.objects.get(user=self.user).status==0):
                return "pending"
            else:
                return "rejected"
    draftacco_portal.boolean=True
    
    def acco_pstatus(self):
        if ( not self.acco_portal()):
            return -1
        else:
            if (accomodation.objects.get(user=self.user).payment_status==1):
                return "Paid"
            if (accomodation.objects.get(user=self.user).payment_status==0):
                return "Not Paid"
            else :
                return "Not Paid"
    

    def __unicode__(self):
        return self.user.first_name + self.user.last_name

class accospot(models.Model):
    user = models.ForeignKey(User)
    acno = models.CharField(max_length=100)
    status=models.IntegerField()
    def is_finalist(self):
        if(len(self.user.finalist_set.all())!=0):
            return True
        else:
            return False
    is_finalist.boolean=True

    def gender(self):
        geder = Profile.objects.filter(user=self.user)
        out=''
        for gender in geder:
            out+=gender.gender
        return out
    def name (self):
        return self.user.first_name+' '+self.user.last_name
    def __unicode__(self):
        return self.user.first_name + self.user.last_name
    def insti (self):
        return self.user.profile.institute
    def acco_portal(self):
        if(accomodation.objects.filter(user=self.user)):
            return True
        else:
            return False
    def draftacco_portal(self):
        if(draftaccomodation.objects.filter(user=self.user)):
            return True
        else:
            return False
    def contact(self):
        return self.user.profile.contact
    def mail(self):
        return self.user.email
    def acco_paymentstatus(self):
        if ( not self.acco_portal()):
            return -1
        else:
            if (accomodation.objects.get(user=self.user).payment_status==1):
                return "Paid"
            if (accomodation.objects.get(user=self.user).payment_status==0):
                return "Not Paid"
            else :
                return "Not Paid"
    def acco_status(self):
        if ( not self.acco_portal()):
            return -1
        else:
            if (accomodation.objects.get(user=self.user).status==1):
               return "accepted"
            if (accomodation.objects.get(user=self.user).status==0):
               return "pending"
            else:
                return "rejected"
    acco_portal.boolean=True
    def draftacco_status(self):
        if ( not self.draftacco_portal()):
            return -1
        else:
            if (draftaccomodation.objects.get(user=self.user).status==1):
                return "accepted"
            if (draftaccomodation.objects.get(user=self.user).status==0):
                return "pending"
            else:
                return "rejected"
    draftacco_portal.boolean=True

    