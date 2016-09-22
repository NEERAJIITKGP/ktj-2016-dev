from django.contrib import admin
from mathCh.models import mathChallengeInfo,MathQuestion,mathUserAnswer,MathUserTime, MathPlayer

class mathUserAnswerAdmin(admin.ModelAdmin):
    list_display = ('user','qstn','created_on')

class MathUserTimeAdmin(admin.ModelAdmin):
    list_display = ('user','gameover','last_played')

admin.site.register(mathChallengeInfo)
admin.site.register(MathQuestion)
admin.site.register(MathPlayer)
admin.site.register(MathUserTime, MathUserTimeAdmin)
admin.site.register(mathUserAnswer, mathUserAnswerAdmin)