from django.contrib import admin
from workshop8.models import *


class work_regt8_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt8,work_regt8_Admin)
   

   
