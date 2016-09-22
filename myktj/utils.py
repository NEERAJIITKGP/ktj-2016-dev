from django.test import TestCase
from django.contrib.auth.models import User
from myktj.models import Profile
from json import loads
import urllib,urllib2
# Create your tests here.
def profile_exists(username,email):
    exists=False
    try:
        username=username
        user=User.objects.get(username=username)
        if User.objects.filter(email=email).count():
            exists=False;
        else:
            raise User.DoesNotExist
        profile=Profile.objects.get(user=user)
        if user and profile:  
            exists=True
    except User.DoesNotExist:
        exists=False
    return exists

def authenticate_server_FB(username,email,access_token):
        url = "https://graph.facebook.com/me?access_token="+access_token
        headers={'content-type': 'application/json'}
        data=None
        print(url)
        #request=urllib2.Request(url,data,headers)
        dict=loads(urllib.urlopen(url).read())
        try:
            if(dict['username']==username and dict['email']==email):
                return True
        except:
            pass
        return False
    
def authenticate_server_GP(username,email,access_token):
        print('asdasdzsd')
        url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+access_token
        data=None
        headers={'content-type': 'application/json'}
        #request=urllib2.Request(url,data,headers)
        dict=loads(urllib.urlopen(url).read())
        print(dict)
        try:
            if(dict['name']==username and dict['email']==email):
                return True
        except:
            pass
        return False