from django.contrib import admin
from sourcecode.models import Sourcecode, SourcecodeUser
# Register your models here.

class SourcecodeAdmin(admin.ModelAdmin):
    list_display = ('user','points')

admin.site.register(Sourcecode,SourcecodeAdmin)
admin.site.register(SourcecodeUser)