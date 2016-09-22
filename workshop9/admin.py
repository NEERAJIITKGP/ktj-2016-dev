from django.contrib import admin
from workshop9.models import *


class work_regt9_Admin(admin.ModelAdmin):
	list_display = ('user', 'workshop','time_work')

admin.site.register(work_regt9,work_regt9_Admin)
   

   
