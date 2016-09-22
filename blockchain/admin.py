from django.contrib import admin
from blockchain.models import *


class roboreg_Admin(admin.ModelAdmin):
	list_display = ('user', 'firstname','lastname','contact','city','time_work','payment_status','txnid')

admin.site.register(roboreg,roboreg_Admin)