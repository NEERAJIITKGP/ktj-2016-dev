from django.contrib import admin
from event.models import *


class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'event_count')
    
class SnappitAdmin(admin.ModelAdmin):
    list_display=('name','contact','email','country','state','institute')
    search_fields=['name','contact']

class MastermindAdmin(admin.ModelAdmin):
	list_display=('user','created_on')
	search_fields=['user']

class MastermindUserAdmin(admin.ModelAdmin):
    list_display = ('user','gameover','last_played')

class workadmin(admin.ModelAdmin):
    list_filter=['workshop']

admin.site.register(Snappit,SnappitAdmin)
admin.site.register(Mastermind,MastermindAdmin)
admin.site.register(MastermindUser,MastermindUserAdmin)  
admin.site.register(Genre)
admin.site.register(Event,EventAdmin)
admin.site.register(WorkshopReg,workadmin)
