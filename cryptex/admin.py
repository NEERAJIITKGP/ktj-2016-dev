from django.contrib import admin
from cryptex.models import *

class BesttimeAdmin(admin.ModelAdmin):
    list_display = ('user','mins','sec')
  

    
admin.site.register(Question)
admin.site.register(Trail)
admin.site.register(BestTime, BesttimeAdmin)