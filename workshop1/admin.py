from django.contrib import admin
from workshop1.models import *


class work_regt1_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt1,work_regt1_Admin)
   

   
