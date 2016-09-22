from django.db import models
from django.contrib.auth.models import User

class roboreg(models.Model):
    user=models.ForeignKey(User,related_name="note_created_by_roboreg")
    city= models.CharField(max_length = 200)
    time_work=models.DateTimeField(auto_now_add=True)
    payment_status=models.CharField(max_length=200,default='failure')
    firstname=models.CharField(max_length=200)
    lastname=models.CharField(max_length=200)
    contact=models.CharField(max_length=15)
    txnid=models.CharField(max_length=200,default='none')
    def __unicode__(self):
        return self.user.username