from django.db import models
from django.contrib.auth.models import User
from myktj.models import Profile

class ExcaliburInfo(models.Model):
	introduction = models.TextField()
	rules = models.TextField()
	abouts = models.TextField()
	finalists=models.TextField(blank=True)

	def __unicode__(self):
		return 'ExcaliburInfo'

class ExcaliburQuestion(models.Model):
	question = models.TextField()
	imageA = models.URLField(max_length = 300,blank=True)
	imageB = models.URLField(max_length = 300,blank=True)
	imageC = models.URLField(max_length = 300,blank=True)
	def __unicode__(self):
		return "Question: No." + str(self.id)

class ExcaliburUserAnswer(models.Model):
	user=models.ForeignKey(User)
	qstn=models.ForeignKey(ExcaliburQuestion)
	answer=models.TextField()
	created_on = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.user.first_name + ' ' + self.user.last_name +'#'+str(self.qstn.id)

class ExcaliburPlayer(models.Model):
	user = models.ForeignKey(User)

	def __unicode__(self):
		return self.user.first_name + ' ' + self.user.last_name 
	
class ExcaliburQuestionCount(models.Model):
	question = models.ForeignKey(ExcaliburQuestion)
	count = models.PositiveIntegerField()

	def __unicode__(self):
			return "Question no "+ str(self.question.id	)