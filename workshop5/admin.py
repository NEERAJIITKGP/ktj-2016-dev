from django.contrib import admin
from workshop5.models import *


class work_regt5_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt5,work_regt5_Admin)
   

   
