from django.contrib import admin
from workshop10.models import *


class work_regt10_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt10,work_regt10_Admin)
   

   
