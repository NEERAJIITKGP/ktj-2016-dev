from django.contrib import admin
from acco.models import *
from myktj.models import *
from event.models import *
from django import forms

class AccoForm(forms.ModelForm):
    INSTITUTES={}
    insti=Institute.objects.all()
    for inst in insti:
        INSTITUTES[inst.institute]=inst.institute
        
    YEAR=(('1','1'),
          ('2','2'),
          ('3','3'),
          ('4','4'),
          ('5','5'),
          ('6','6'),
          ('7','Other'),
          )
    STATUS=(('1','APPROVED'),
            ('2','REJECTED'),
            ('0','PENDING')
            )
    PAYMENT=(('1','Paid'),
            ('0','Not Paid')
            )
    institution = forms.ChoiceField(choices=INSTITUTES.items())
    year=forms.ChoiceField(choices=YEAR)
    status=forms.ChoiceField(choices=STATUS)
    payment_status=forms.ChoiceField(choices=PAYMENT)
 
class AccospotForm(forms.ModelForm):
    STATUS=(('1','ALLOTED'),
            ('0','PENDING')
            )  
    status=forms.ChoiceField(choices=STATUS)

class DraftAccoForm(forms.ModelForm):
    INSTITUTES={}
    insti=Institute.objects.all()
    for inst in insti:
        INSTITUTES[inst.institute]=inst.institute
        
    YEAR=(('1','1'),
          ('2','2'),
          ('3','3'),
          ('4','4'),
          ('5','5'),
          ('6','6'),
          ('7','Other'),
          )
    STATUS=(('1','APPROVED'),
            ('2','REJECTED'),
            ('0','PENDING')
            )
    institution = forms.ChoiceField(choices=INSTITUTES.items())
    year=forms.ChoiceField(choices=YEAR)
    draft=forms.CharField(max_length=25)
    status=forms.ChoiceField(choices=STATUS)

class finalistAdmin(admin.ModelAdmin):
    list_display = ('user','name','contact' ,'acco_portal','acco_status','draftacco_portal','draftacco_status','acco_pstatus','insti','event')
    raw_id_fields=('user',)
    list_filter=['event']
    
def add_onspot(modeladmin, request, queryset):
    from datetime import date
    checkin_date = date.today()
    for q in queryset:
        hall_def = halls.objects.all()[0]
        if len(onspot.objects.all().filter( participant=q ))>0:
            return
        os = onspot(participant=q, hallname=hall_def, checkin= checkin_date, checkout='2015-02-03', alloted=True)
        os.save()
add_onspot.short_description = "Add participants to onspot"


class AccoAdmin(admin.ModelAdmin):
    list_display = ('user','fname','mail','mobile','gender','draft','approval_status','status','payment_pstatus','is_finalist','state','reg_events')
    raw_id_fields=('user',)
    list_editable=['status']
    list_filter = ['status','payment_status','user__profile__gender','user__profile__state','user__event_reg__event']
    search_fields = ['user__username','user__first_name','institution']
    actions = [add_onspot]
    form=AccoForm
 
class DraftAccoAdmin(admin.ModelAdmin):
    list_display = ('user','fname','mail','mobile', 'draft','gender','approval_status','status','reg_events','is_finalist','state')
    raw_id_fields=('user',)
    list_editable=['status']
    list_filter = ['status','user__profile__gender','user__profile__state','user__event_reg__event']
    search_fields = ['user__username','draft','user__first_name','institution']
    actions = [add_onspot]
    form=DraftAccoForm

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user','email','orderid') 
    search_fields = ['user','email','orderid']  

    
class accospotAdmin(admin.ModelAdmin):
    list_display = ('name','contact' ,'mail','insti','gender','status','acno','acco_status','acco_paymentstatus','draftacco_status')
    raw_id_fields=('user',)
    list_filter=['status','user__profile__gender','user__profile__state']
    list_editable=['status']
    search_fields = ['user__username','user__first_name','acno','user__email']
    form=AccospotForm
    
    
admin.site.register(accomodation,AccoAdmin)
admin.site.register(draftaccomodation,DraftAccoAdmin)
# admin.site.register(halls)
admin.site.register(payment,PaymentAdmin)
admin.site.register(accospot,accospotAdmin)
admin.site.register(finalist, finalistAdmin)
