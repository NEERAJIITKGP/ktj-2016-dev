from django.contrib import admin
from journal.models import *
from event.models import *

class WorkshopAdmin(admin.ModelAdmin):
    list_display = ('name', 'workshop_count')

admin.site.register(MenuDescription)
admin.site.register(ContactPost)
admin.site.register(Contact)
admin.site.register(Workshop,WorkshopAdmin)
admin.site.register(Exhibition)
admin.site.register(Guest)
admin.site.register(Megashow)
admin.site.register(Update)