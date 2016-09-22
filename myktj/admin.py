from django.contrib import admin
from myktj.models import *

class StateAdmin(admin.ModelAdmin):
    list_display = ('state', 'user_count')

class InstituteAdmin(admin.ModelAdmin):
    list_display = ('institute', 'user_count')
    list_filter=['state']
    search_fields=['institute']

class ProfileAdmin(admin.ModelAdmin):
    list_display=('id','username','firstname','lastname','state','institute','department','year','email','contact')
    list_filter=['state','department']
    search_fields=['contact','user__username','user__email','user__first_name']
class EventRegAdmin (admin.ModelAdmin):
    list_display=('id','username','name','event','email','institute','department','contact')
    list_filter=['event']
class TeamAdmin(admin.ModelAdmin):
    list_display=('id','leader','HeadName','HeadInsti','HeadEmail','HeadContact','get_members')
    list_filter=['event']
    raw_id_fields=('members',)

class DigitalIndiaAdmin(admin.ModelAdmin):
    list_display = ('id','username','name','email','institute','department','contact')
    search_fields=['email']

class DigitalIndiaWorkshopAdmin(admin.ModelAdmin):
    list_display = ('id','username','name','email','institute','department','contact')
    search_fields=['email']

class SankalpAdmin(admin.ModelAdmin):
    list_display = ('id','username','name','email','institute','department','contact')
    search_fields=['email']
class BlockchainAdmin(admin.ModelAdmin):
    list_display = ('id','username','name','email','institute','department','contact')
    search_fields=['email']

admin.site.register(Profile,ProfileAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(Institute, InstituteAdmin)
admin.site.register(Department)
admin.site.register(event_reg,EventRegAdmin)
admin.site.register(Team,TeamAdmin)
admin.site.register(Invitation)
admin.site.register(KolkataWorkshop)
admin.site.register(DigitalIndia,DigitalIndiaAdmin)
admin.site.register(DigitalIndiaWorkshop,DigitalIndiaWorkshopAdmin)
admin.site.register(Sankalp,SankalpAdmin)
admin.site.register(Submission)
admin.site.register(Blockchain,BlockchainAdmin)
#admin.site.register(Initiative)
