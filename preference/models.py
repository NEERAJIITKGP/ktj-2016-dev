from django.db import models
from django.contrib.auth.models import User
from acco.models import *
import os
from datetime import datetime

# Create your models here.
class Preference(models.Model):
  user=models.ForeignKey(User)
  pref_1 = models.IntegerField(default=0)
  pref_2 = models.IntegerField(default=0)
  pref_3 = models.IntegerField(default=0)
  pref_4 = models.IntegerField(default=0)
  pref_5 = models.IntegerField(default=0)
  pref_6 = models.IntegerField(default=0)
  pref_7 = models.IntegerField(default=0)
  pref_8 = models.IntegerField(default=0)
  pref_9 = models.IntegerField(default=0)
  pref_10 = models.IntegerField(default=0)
  pref_11 = models.IntegerField(default=0)
  time = models.DateTimeField(default=datetime.now())
	
