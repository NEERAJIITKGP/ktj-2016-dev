import os
from django.db import models
from django.db.models.fields.related import OneToOneField
from django.conf import settings
from django.contrib.auth.models import User
from event.models import Event

class State(models.Model):
    state = models.CharField(max_length = 100)

    def user_count(self):
        return Profile.objects.filter(state = self.id).count()

    def __unicode__(self):
        return self.state

class Department(models.Model):
    department = models.CharField(max_length = 100)
    
    def __unicode__(self):
        return self.department

class Institute(models.Model):
    state = models.ForeignKey(State)
    institute = models.CharField(max_length = 100)

    def user_count(self):
        return Profile.objects.filter(institute = self.id).count()

    def __unicode__(self):
        return self.institute

class Profile(models.Model):
    GENDER_CHOICES = (('M', 'Male'),
                      ('F', 'Female'))
    def username (self):
        return self.user.username
    def firstname(self):
        return self.user.first_name
    def lastname(self):
        return self.user.last_name
    def email(self):
        return self.user.email
    user = OneToOneField(settings.AUTH_USER_MODEL)
    dateOfBirth = models.DateField()
    gender = models.CharField(max_length = 1, choices = GENDER_CHOICES)
    department = models.ForeignKey(Department)
    year = models.IntegerField()
    institute = models.ForeignKey(Institute)
    state = models.ForeignKey(State)
    country = models.CharField(max_length = 100)
    contact = models.CharField(max_length = 20)
    address = models.TextField()
    regDate = models.DateTimeField()
    def __unicode__(self):
        return self.user.username

class event_reg(models.Model):
    
    def username (self):
        return self.user.username
    def name(self):
        return self.user.first_name+' '+self.user.last_name
    def email(self):
        return self.user.email
    def institute(self):
        return Profile.objects.get(user=self.user).institute
    def department (self):
        return Profile.objects.get(user=self.user).department
    def contact (self):
        return Profile.objects.get(user=self.user).contact   
    
    user=models.ForeignKey(settings.AUTH_USER_MODEL)
    event=models.ForeignKey(Event)
    def __unicode__(self):
        return str(self.event.name+' : '+self.user.username)

class KolkataWorkshop(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL)

class DigitalIndia(models.Model):
    def username (self):
        return self.user.username
    def name(self):
        return self.user.first_name+' '+self.user.last_name
    def email(self):
        return self.user.email
    def institute(self):
        return Profile.objects.get(user=self.user).institute
    def department (self):
        return Profile.objects.get(user=self.user).department
    def contact (self):
        return Profile.objects.get(user=self.user).contact
    user=models.ForeignKey(settings.AUTH_USER_MODEL)
    def __unicode__(self):
        return str(self.user.username)

class DigitalIndiaWorkshop(models.Model):
    def username (self):
        return self.user.username
    def name(self):
        return self.user.first_name+' '+self.user.last_name
    def email(self):
        return self.user.email
    def institute(self):
        return Profile.objects.get(user=self.user).institute
    def department (self):
        return Profile.objects.get(user=self.user).department
    def contact (self):
        return Profile.objects.get(user=self.user).contact
    user=models.ForeignKey(settings.AUTH_USER_MODEL)
    def __unicode__(self):
        return str(self.user.username)

class Sankalp(models.Model):
    def username (self):
        return self.user.username
    def name(self):
        return self.user.first_name+' '+self.user.last_name
    def email(self):
        return self.user.email
    def institute(self):
        return Profile.objects.get(user=self.user).institute
    def department (self):
        return Profile.objects.get(user=self.user).department
    def contact (self):
        return Profile.objects.get(user=self.user).contact
    user=models.ForeignKey(settings.AUTH_USER_MODEL)
    def __unicode__(self):
        return str(self.user.username)

class Blockchain(models.Model):
    def username (self):
        return self.user.username
    def name(self):
        return self.user.first_name+' '+self.user.last_name
    def email(self):
        return self.user.email
    def institute(self):
        return Profile.objects.get(user=self.user).institute
    def department (self):
        return Profile.objects.get(user=self.user).department
    def contact (self):
        return Profile.objects.get(user=self.user).contact
    user=models.ForeignKey(settings.AUTH_USER_MODEL)
    def __unicode__(self):
        return str(self.user.username)

#class Initiative(models.Model):
#    user=models.ForeignKey(settings.AUTH_USER_MODEL)

class Team(models.Model):
    leader = models.ForeignKey(Profile, related_name='leader')
    members = models.ManyToManyField(Profile, related_name='member')
    event = models.ForeignKey(Event)
    def HeadContact(self):
        return self.leader.contact
    def HeadName(self):
        return self.leader.user.first_name+' '+self.leader.user.last_name
    def HeadEmail(self):
        return self.leader.user.email
    def HeadInsti(self):
        return self.leader.institute
    def get_members(self):
            return "\n ,".join([p.user.username for p in self.members.all()])

    def __unicode__(self):
        return 'TeamID_'+ str(self.id) +' '+ self.event.name

class Invitation(models.Model):
    INVITATION_STATUS = (('1', 'Pending'),
                         ('2', 'Accepted'))

    team = models.ForeignKey(Team)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    status = models.IntegerField(choices = INVITATION_STATUS)

def upload_directory(instance, filename):
    directory = 'templates/static/myktj2016/%s/' % instance.event.name
    filename = str(instance.event.name) + '_' + str(instance.team.id) + str(instance.filetype)
    return os.path.join(directory, filename)

class Submission(models.Model):
    team = models.ForeignKey(Team)
    profile = models.ForeignKey(Profile)
    event = models.ForeignKey(Event)
    filetype = models.CharField(max_length=5)
    attempts = models.PositiveIntegerField() 
    file = models.FileField(upload_to=upload_directory)


    def __unicode__(self):
        return self.event.name +'__'+ str(self.team.id)

''' user event attempts submission '''
''' team invitation - other member not yet register '''
