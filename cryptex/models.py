from django.db import models
from django.contrib.auth.models import User
"""
1,2,3,4 are pegs submitted (in order)
White = Matches color but doesnot match Position
Blue = Matches color and Position.
    """


class Question(models.Model):
#to start: 
#
#    -Set random string to answer
#    -Set is_active to true
#    -Set User to curred loggedin User
#to stop:
#    -set is_active to false.
#    -set result to true or false
#
#Answer: get using array (answer[0])
#is_current: check if user is playing this game
    user=models.ForeignKey(User)
    answer = models.CharField(max_length = 4)
    is_active=models.BooleanField(default=True)
    is_trail=models.BooleanField(default=False)
    result=models.BooleanField(default = False)
    created_on=models.DateTimeField(auto_now_add=True)
    def num_of_trails(self):
        return len(Trail.objects.all().filter(question=self))
    def history (self):
        return self.trail_set.all()
    def __unicode__(self):
        return self.user.username+':'+self.answer
class Trail(models.Model):
    question=models.ForeignKey(Question)
    trail=models.CharField(max_length=4)
    created_on=models.DateTimeField(auto_now_add=True)
    white=models.IntegerField(default=0)
    blue=models.IntegerField(default=0)
    def __unicode__(self):
        return self.question.user.username
    def user(self):
        return self.question.user
    def answer (self):
        return self.question.answer
class BestTime(models.Model):
    mins=models.IntegerField()
    sec=models.IntegerField()
    user=models.ForeignKey(User)
