from django.db import models

class MenuDescription(models.Model):

    MENU_CHOICES = (
        ('ev', 'Events'),
        ('sp', 'Sponsors'),
        ('ex', 'Exhibitions'),
        ('ws', 'Workshops'),
        ('ms', 'Megashows'),
        ('gl', 'Guests'),
        ('ct', 'Contacts'),
    )
    menu = models.CharField(max_length = 2, choices=MENU_CHOICES, unique = True)
    message = models.TextField()

    def __unicode__(self):
        return self.get_menu_display()

class ContactPost(models.Model):
    name = models.CharField(max_length = 100, unique = True)
    rank = models.PositiveIntegerField(unique = True)

    def __unicode__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length = 100, unique = True)
    post = models.ForeignKey(ContactPost)
    phone = models.DecimalField(max_digits = 10, decimal_places = 0)
    social_link = models.URLField(max_length = 300, blank = True)
    social_image = models.URLField(max_length = 300, blank = True)
    email = models.EmailField()

    def __unicode__(self):
        return self.name

class Workshop(models.Model):
    def workshop_count(self):
        count= self.workshopreg_set.all().count()
        return count
        
    name = models.CharField(max_length = 200)
    link = models.URLField(max_length = 300)
    introduction = models.TextField()
    company_img = models.URLField(max_length = 400, blank = True)
    image = models.URLField(max_length = 400, blank = True)

    def __unicode__(self):
        return self.name

class Exhibition(models.Model):
    name = models.CharField(max_length = 200)
    description = models.TextField()
    country_flag = models.URLField(max_length = 400)
    country = models.CharField(max_length = 30)
    image = models.URLField(max_length = 400, blank = True)

    def __unicode__(self):
        return self.name

class Guest(models.Model):
    name = models.CharField(max_length = 200)
    description = models.TextField()
    image = models.URLField(max_length = 400, blank = True)
    iconimage = models.URLField(max_length = 400, blank = True)

    def __unicode__(self):
        return self.name

class Megashow(models.Model):
    name = models.CharField(max_length = 200)
    description = models.TextField()
    image = models.URLField(max_length = 400, blank = True)

    def __unicode__(self):
        return self.name

class Update(models.Model):
    message = models.TextField()

    class Meta:
        ordering = ['-id']

    def __unicode__(self):
        return self.message
