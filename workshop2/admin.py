from django.contrib import admin
from workshop2.models import *


class work_regt2_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt2,work_regt2_Admin)
   

   
