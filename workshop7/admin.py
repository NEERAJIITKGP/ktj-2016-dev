from django.contrib import admin
from workshop7.models import *


class work_regt7_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt7,work_regt7_Admin)
   

   
