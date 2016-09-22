from django.db import models

# Create your models here.

class Mailer(models.Model):
    date=models.DateTimeField()
    subject=models.TextField()
    message=models.TextField()
    to_emails=models.TextField()
    stop=models.IntegerField()
    from_mail=models.EmailField()
    
    def __unicode__(self):
        return self.subject
        
    