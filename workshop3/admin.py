from django.contrib import admin
from workshop3.models import *


class work_regt3_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt3,work_regt3_Admin)
   

   
