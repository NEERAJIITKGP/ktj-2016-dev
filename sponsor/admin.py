from django.contrib import admin
from sponsor.models import *

class SponsorAdmin(admin.ModelAdmin):
    list_display = ('name','post')

admin.site.register(Year)
admin.site.register(Post)
admin.site.register(Sponsor, SponsorAdmin)
admin.site.register(TickerSpons)
admin.site.register(TickerLink)
admin.site.register(SponsCat)
