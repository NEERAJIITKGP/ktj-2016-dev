from django.contrib import admin
from preference.models import Preference
# Register your models here.

class PreferenceAdmin(admin.ModelAdmin):
    list_display = ('user','pref_1','pref_2','pref_3','pref_4','pref_5','pref_6','pref_7','pref_8','pref_9','pref_10','pref_11','time')

admin.site.register(Preference, PreferenceAdmin)
