from django.contrib import admin
from workshopregister.models import *


class work_regt_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt,work_regt_Admin)
   

   
