from django.contrib import admin
from workshop11.models import *


class work_regt11_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt11,work_regt11_Admin)
   

   
