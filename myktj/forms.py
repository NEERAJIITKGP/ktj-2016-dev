from django import forms
from django.contrib.auth.models import User as User
from django.db import transaction
from django.forms.extras.widgets import SelectDateWidget
from django.forms import ModelForm
from django.contrib.auth import authenticate, login 
from django.utils import timezone
from myktj.models import * 
from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import ugettext_lazy as _
from django.http.response import HttpResponseRedirect, HttpResponse

BIRTH_YEAR_CHOICES = [str(year) for year in range(1980, 2011)]

GENDER_CHOICES = (('M','Male'),
                  ('F','Female'))
                
YEAR_CHOICES = (('1','1st'),
                ('2','2nd'),
                ('3','3rd'),
                ('4','4th'),
                ('5','5th'),
                ('6','Postgraduate Ist'),
                ('7','Postgraduate IInd'),
                ('8','Postgraduate IIIrd'),
                ('9','Other'))

STATES = {'':'Choose State'}

INSTITUTES = {'':'Choose Institute'}

DEPARTMENTS = {}

class ProfileForm(forms.Form):
    username = forms.CharField(max_length = 30, label = _('Username'), required = True)
    email = forms.EmailField(max_length = 75, label = _('Email Address'), required = True)
    password1 = forms.CharField(label = _('Password'), required = False, widget = forms.PasswordInput)
    password2 = forms.CharField(label = _('Password(again)'), required = False, widget = forms.PasswordInput)
    firstname = forms.CharField(max_length = 30, label = _('Firstname'), required = True)
    lastname = forms.CharField(max_length = 30,label = _('Lastname'), required = True)
    gender = forms.ChoiceField(choices = GENDER_CHOICES, label = _('Gender'))
    dateOfBirth = forms.DateField(label = _('Date Of Birth'), widget = SelectDateWidget(years = BIRTH_YEAR_CHOICES))
    institution = forms.ChoiceField(choices = INSTITUTES, label = _('Institution'))
    country = forms.CharField(max_length = 100, label = _('Country'))
    state = forms.ChoiceField(choices = STATES, label = _('State'))
    department = forms.ChoiceField(choices = DEPARTMENTS, label = _('Department'))
    year = forms.ChoiceField(choices = YEAR_CHOICES, label = _('Year'))
    contact = forms.CharField(max_length = 20, label = _('Contact'))
    address = forms.CharField(label = _('Address'), widget = forms.Textarea)
    
    # class Meta:
        # model = Profile

    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)

        ss = State.objects.all()
        for s in ss:
            STATES[s.state]=s.state

        iis = Institute.objects.all()
        for ii in iis:
            INSTITUTES[ii.institute]=ii.institute
            
        ds = Department.objects.all()
        for d in ds:
            DEPARTMENTS[d.department]=d.department

        self.fields['state'].choices = STATES.items()
        self.fields['institution'].choices = INSTITUTES.items()
        self.fields['department'].choices = DEPARTMENTS.items()
        
    def clean(self):
        cleaned_data = super(ProfileForm, self).clean()
        print len(cleaned_data)
        if len(cleaned_data) == 15:
            u = User.objects.filter(username = self.cleaned_data['username'])
            if u.count() >= 1:
                raise forms.ValidationError(_("Username already exists, please try with another username."))

            u = User.objects.filter(email = self.cleaned_data['email'])
            if u.count() >= 1:
                raise forms.ValidationError(_("User with this Email ID Exists."))

            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError(_("Passwords are not matching."))

            if len(self.cleaned_data['password1']) < 6:
                raise forms.ValidationError(_("Password must be atleast 6 characters long."))
            return self.cleaned_data
        else:
            raise forms.ValidationError(_("All fields are mandatory."))
            return self.cleaned_data
 
    #@transaction.commit_on_success
    def save(self):
#        print "WTF is this????"
        if self.is_valid():
            user = User.objects.create_user(self.cleaned_data['username'], self.cleaned_data['email'], self.cleaned_data['password1'])
            user.first_name = self.cleaned_data['firstname']
            user.last_name = self.cleaned_data['lastname']
            user.save()
            profile = Profile()
            profile.user = user
            profile.gender = self.cleaned_data['gender']
            profile.dateOfBirth = self.cleaned_data['dateOfBirth']
            profile.institute = Institute.objects.get(institute = self.cleaned_data['institution'])
            profile.country = self.cleaned_data['country']
            profile.state = State.objects.get(state = self.cleaned_data['state'])
            profile.department = Department.objects.get(department = self.cleaned_data['department'])
            profile.year = self.cleaned_data['year']
            profile.contact = self.cleaned_data['contact']
            profile.address = self.cleaned_data['address']
            profile.regDate = timezone.now()
            profile.save()

class LoginForm(forms.Form):
    username = forms.CharField(label = _("Username"), required = True)
    password = forms.CharField(label = _('Password'), required = True, widget = forms.PasswordInput)
    remember = forms.BooleanField(label = _("Remember Me"), required = False)
    user = None
    
    def clean(self):
        cleaned_data = super(LoginForm, self).clean()
        if self.is_valid():
            user = authenticate(username = self.cleaned_data['username'], password = self.cleaned_data['password'])
            if user:
                if user.is_active:
                    self.user = user
                else:
                    raise forms.ValidationError(_("This account is currently inactive"))
            else:
                raise forms.ValidationError(_('Incorrect credentials provided'))
            return self.cleaned_data
        raise forms.ValidationError(_("All fields are mandatory"))
    
    def get_success_url(self):
        return '/accounts/check_logged'
    
    def get_fail_url(self):
        return '/accounts/login'
    
    def login(self, request, redirect_url = None):
        user = self.user
        if user is not None:
            if user.is_active:
                login(request, user)
                ret = self.get_success_url() 
                
                
            else:
                ret = self.get_fail_url()
        else:
            ret = self.get_fail_url()
        if self.cleaned_data["remember"]:
            request.session.set_expiry(60 * 60 * 24 * 7 * 3)
        else:
            request.session.set_expiry(0)
        return HttpResponseRedirect(ret)
 

########## MYKTJ Portal Login Form  #################
class MLoginForm(forms.Form):
    username = forms.CharField(label = _("Username"), required = True)
    password = forms.CharField(label = _('Password'), required = True, widget = forms.PasswordInput)
    remember = forms.BooleanField(label = _("Remember Me"), required = False)
    
    user = None
    
    def clean(self):
        cleaned_data = super(MLoginForm, self).clean()
        if self.is_valid():
            user = authenticate(username = self.cleaned_data['username'], password = self.cleaned_data['password'])
            
            if user:
                if user.is_active:
                    self.user = user
                else:
                    raise forms.ValidationError(_("This account is currently inactive"))
            else:
                raise forms.ValidationError(_('Incorrect credentials provided'))
            return self.cleaned_data
        raise forms.ValidationError(_("All fields are mandatory"))
    
    
    def get_success_url(self):
        return '/myktj'
    
    def get_fail_url(self):
        return '/accounts/mlogin'
    
    def mlogin(self, request, redirect_url = None):
        user = self.user
        if user is not None:
            if user.is_active:
                login(request, user)
                ret = self.get_success_url()
            else:
                ret = self.get_fail_url()
        else:
            ret = self.get_fail_url()
        if self.cleaned_data["remember"]:
            request.session.set_expiry(60 * 60 * 24 * 7 * 3)
        else:
            request.session.set_expiry(0)
        return HttpResponseRedirect(ret)






######## Acco Portal Login Form ##########
class MSigninForm(forms.Form):
    username = forms.CharField(label = _("Username"), required = True)
    password = forms.CharField(label = _('Password'), required = True, widget = forms.PasswordInput)
    remember = forms.BooleanField(label = _("Remember Me"), required = False)
    
    user = None
    
    def clean(self):
        cleaned_data = super(MSigninForm, self).clean()
        if self.is_valid():
            user = authenticate(username = self.cleaned_data['username'], password = self.cleaned_data['password'])
            
            if user:
                if user.is_active:
                    self.user = user
                else:
                    raise forms.ValidationError(_("This account is currently inactive"))
            else:
                raise forms.ValidationError(_('Incorrect credentials provided'))
            return self.cleaned_data
        raise forms.ValidationError(_("All fields are mandatory"))
    
    
    def get_success_url(self):
        return '/roboticsworkshop'
    
    def get_fail_url(self):
        return '/accounts/msignin'
    
    def msignin(self, request, redirect_url = None):
        user = self.user
        if user is not None:
            if user.is_active:
                login(request, user)
                ret = self.get_success_url()
            else:
                ret = self.get_fail_url()
        else:
            ret = self.get_fail_url()
        if self.cleaned_data["remember"]:
            request.session.set_expiry(60 * 60 * 24 * 7 * 3)
        else:
            request.session.set_expiry(0)
        return HttpResponseRedirect(ret)

