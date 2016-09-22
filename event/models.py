from django.db import models
from django.contrib.auth.models import User
import os
from journal.models import Workshop


class Genre(models.Model):
    name = models.CharField(max_length = 200, unique = True)
    image = models.URLField()

    def __unicode__(self):
        return self.name

class Event(models.Model):

    def event_count(self):
        count= self.event_reg_set.all().count()
        return count

    name = models.CharField(max_length = 200)
    onliner = models.CharField(max_length = 300)
    sponsor = models.URLField(blank = True)
    asso = models.URLField(blank = True)
    quote = models.TextField(blank = True)
    genre = models.ForeignKey(Genre)
    introduction = models.TextField()
    rules = models.TextField()
    maxPeople = models.IntegerField(null = True, blank = True)
    fileSubmission = models.BooleanField()
    judging = models.TextField(blank = True)
    prizes = models.TextField(blank = True)
    problemStatement = models.TextField(blank = True)
    register = models.TextField(blank = True)
    contacts = models.TextField()
    results = models.TextField(blank = True)
    image = models.URLField()
    iconimage = models.URLField()

    def __unicode__(self):
        return self.name

def snappit_directory(instance, filename):
    directory = 'templates/static/myktj2016/snappit/'
    filename = str(instance.name) + '_' + str(instance.contact) +'_'+ str(instance.filename)
    return os.path.join(directory, filename)

class Snappit(models.Model):
    name=models.CharField(max_length = 100)
    email = models.CharField(max_length = 100)
    contact = models.CharField(max_length = 20)
    country = models.CharField(max_length = 100)
    state = models.CharField(max_length = 100)
    institute = models.CharField(max_length = 100)
    filename = models.CharField(max_length = 100,null = True)
    file = models.FileField(upload_to=snappit_directory)
    subdate = models.DateTimeField()

class Mastermind(models.Model):
    user=models.ForeignKey(User)
    answer1=models.TextField()
    answer2=models.TextField()
    answer3=models.TextField()
    answer4=models.TextField()
    answer5=models.TextField()
    answer6=models.TextField()
    answer7=models.TextField()
    answer8=models.TextField()
    answer9=models.TextField()
    answer10=models.TextField()
    answer11=models.TextField()
    answer12=models.TextField()
    answer13=models.TextField()
    answer14=models.TextField()
    answer15=models.TextField()
    answer16=models.TextField()
    answer17=models.TextField()
    answer18=models.TextField()
    answer19=models.TextField()
    answer20=models.TextField()
    answer21=models.TextField()
    answer22=models.TextField()
    answer23=models.TextField()
    answer24=models.TextField()
    answer25=models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.user.username + ' ' + self.user.last_name

class MastermindUser(models.Model):
    user=models.ForeignKey(User,unique=True)
    last_played = models.DateTimeField()
    gameover = models.IntegerField(default=0, blank=True)

    def __unicode__(self):
        return self.user.username

class WorkshopReg(models.Model):
    user=models.ForeignKey(User)
    workshop=models.ForeignKey(Workshop)
    pub_date = models.DateTimeField('date published', auto_now_add=True)