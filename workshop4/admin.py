from django.contrib import admin
from workshop4.models import *


class work_regt4_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt4,work_regt4_Admin)
   

   
