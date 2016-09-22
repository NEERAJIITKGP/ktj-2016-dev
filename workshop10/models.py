from django.db import models
from django.contrib.auth.models import User

class work_regt10(models.Model):
    user=models.ForeignKey(User,related_name="note_created_by_user10")
    workshop= models.CharField(max_length = 200)
    time_work=models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.user.username
    