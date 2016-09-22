from django.db import models

class Post(models.Model):
    title=models.CharField(max_length=20)
    content=models.CharField(max_length=100000)
    meta=models.CharField(max_length=500)
    metaImg=models.CharField(max_length=100)
    Date=models.DateField(auto_now=True)

    def __unicode__ (self):
        return self.title
    