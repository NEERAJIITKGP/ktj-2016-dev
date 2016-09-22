from django.db import models

class Year(models.Model):
    year = models.PositiveIntegerField(unique = True)
    class Meta:
        ordering = ['-year']
    def __unicode__(self):
        return str(self.year)

class Post(models.Model):
    name = models.CharField(max_length = 100)
    year = models.ForeignKey(Year)
    rank = models.PositiveIntegerField()

    class Meta:
        unique_together = (('year', 'rank'), ('year','name'))
        ordering = ['rank']
        
    def __unicode__(self):
        return str(self.year) + " " + self.name

class Sponsor(models.Model):
    rank = models.PositiveIntegerField()
    name = models.CharField(max_length = 100)
    post = models.ForeignKey(Post)
    link = models.URLField(max_length = 300)
    image = models.URLField(max_length = 300)
    bigger = models.BooleanField(help_text = 'Bigger in Size')
    special = models.BooleanField(help_text = 'One per line')

    class Meta:
        unique_together = (('post', 'name'))
        ordering = ['-special','-bigger','id']

    def __unicode__(self):
        return str(self.post) + " " + self.name 
        
class TickerSpons(models.Model):
    rank = models.DecimalField(unique= True, decimal_places=4, max_digits=5) 
    spons = models.ForeignKey(Sponsor)
    
    def __unicode__(self):
        return str(self.rank) + " - " + self.spons.name 

class TickerLink (models.Model):
    ticker=models.ForeignKey(TickerSpons)
    link=models.URLField(max_length=300)
    def __unicode__(self):
        return str(self.ticker.spons.name)

class SponsCat (models.Model):
    spons=models.ForeignKey(Sponsor)
    cat=models.CharField(max_length=50)
    def __unicode__(self):
        return str(self.cat+':'+self.spons.name)
    
   