from django.contrib import admin
from excalibur.models import ExcaliburInfo,ExcaliburQuestion,ExcaliburUserAnswer, ExcaliburPlayer,ExcaliburQuestionCount
# Register your models here.

class ExcaliburUserAnswerAdmin(admin.ModelAdmin):
    list_display = ('user','qstn','created_on')

class ExcaliburQuestionCountAdmin(admin.ModelAdmin):
    list_display = ('question','count')

admin.site.register(ExcaliburInfo)
admin.site.register(ExcaliburQuestion)
admin.site.register(ExcaliburPlayer)
admin.site.register(ExcaliburUserAnswer,ExcaliburUserAnswerAdmin)
admin.site.register(ExcaliburQuestionCount, ExcaliburQuestionCountAdmin)