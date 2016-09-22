from django.db import models
from datetime import *
from django.contrib.auth.models import User
import os
# Create your models here.

class Sourcecode(models.Model):
    user=models.ForeignKey(User, unique=True)
    points=models.IntegerField(default=1000)
    question1=models.IntegerField(default=0)
    question2=models.IntegerField(default=0)
    question3=models.IntegerField(default=0)
    question4=models.IntegerField(default=0)
    question5=models.IntegerField(default=0)
    question6=models.IntegerField(default=0)
    clickquestion1=models.IntegerField(default=0)
    clickquestion2=models.IntegerField(default=0)
    clickquestion3=models.IntegerField(default=0)
    clickquestion4=models.IntegerField(default=0)
    clickquestion5=models.IntegerField(default=0)
    clickquestion6=models.IntegerField(default=0)
    bid1 = models.IntegerField(default=0)
    bid2= models.IntegerField(default=0)
    bid3 = models.IntegerField(default=0)
    bid4 = models.IntegerField(default=0)
    bid5 = models.IntegerField(default=0)
    bid6 = models.IntegerField(default=0)
    created_on = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.user.username + ' ' + self.user.last_name
class SourcecodeUser(models.Model):
    user=models.ForeignKey(User,unique=True)
    last_played = models.DateTimeField(default=datetime.now,blank=True)
    last_played2 = models.DateTimeField(default=datetime.now,blank=True)
    last_played3 = models.DateTimeField(default=datetime.now,blank=True)
    last_played4 = models.DateTimeField(default=datetime.now,blank=True)
    last_played5 = models.DateTimeField(default=datetime.now,blank=True)
    last_played6 = models.DateTimeField(default=datetime.now,blank=True)
    gameover = models.IntegerField(default=0, blank=True)
    gameover2 = models.IntegerField(default=0, blank=True)
    gameover3 = models.IntegerField(default=0, blank=True)
    gameover4 = models.IntegerField(default=0, blank=True)
    gameover5 = models.IntegerField(default=0, blank=True)
    gameover6 = models.IntegerField(default=0, blank=True)


    def __unicode__(self):
        return self.user.username
