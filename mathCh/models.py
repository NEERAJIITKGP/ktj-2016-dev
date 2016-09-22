from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from myktj.models import Profile

class mathChallengeInfo(models.Model):
    introduction = models.TextField()
    contacts = models.TextField()
    rules = models.TextField()
    prizes = models.TextField()
    finalists=models.TextField(blank=True)

    def __unicode__(self):
            return 'Math Challenge Info'
        
class MathQuestion(models.Model):
	question = models.TextField()

	def __unicode__(self):
		return "Question: No." + str(self.id)

class mathUserAnswer(models.Model):
	user=models.ForeignKey(User)
	qstn=models.ForeignKey(MathQuestion)
	answer=models.TextField()
	created_on = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.user.username + ' ' + self.user.last_name +'#'+str(self.qstn.id)

class MathPlayer(models.Model):
	user = models.ForeignKey(User)

	def __unicode__(self):
		return self.user.first_name + ' ' + self.user.last_name

class MathUserTime(models.Model):
	user=models.ForeignKey(User,unique=True)
	last_played = models.DateTimeField()
	gameover = models.IntegerField(default=0, blank=True)

	def __unicode__(self):
		return self.user.username