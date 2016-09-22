from django.contrib import admin
from workshop6.models import *


class work_regt6_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt6,work_regt6_Admin)
   

   
