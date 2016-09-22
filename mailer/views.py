from django.shortcuts import render
from django.core.mail import send_mail
from models import Mailer
from myktj.models import Profile,State,Institute
from django.contrib.auth.models import User
from forms import MailerForm
from django.utils import timezone
from django.http.response import HttpResponse,Http404
from django.core.mail import EmailMultiAlternatives

# Create your views here.

def mailer_send(request):
    if(request.user.is_superuser):
        states=request.POST.getlist('states')
        institutes=request.POST.getlist('institutes')
        emails=[]
        print(states)
        users=Profile.objects.filter(State__in=states).filter(Institution__in=institutes)
        if request.POST['to_email']!='':
            emails_list=request.POST['to_email'].split(',')
            for email in emails_list:
                emails.append(email)
        else:
            for profile in users:
                user=profile.user
                emails.append(user.email)
                
        subject=request.POST['subject']
        message=request.POST['message']
        to_mails=(',').join(emails)
        if request.POST['from_email']!='':
            from_mail=request.POST['from_email']
        else:
            from_mail='kshitij@ktj.in'
        mailer=Mailer()
        mailer.subject=subject
        mailer.message=message
        mailer.date=timezone.now()
        mailer.to_emails=to_mails
        mailer.from_mail=from_mail
        mailer.stop=0
        mailer.save()
        for email in emails:
            msg = EmailMultiAlternatives(subject, message, from_mail, [email])
            msg.attach_alternative(message, "text/html")
            msg.send()
            #send_mail(subject, message, from_mail,[email], fail_silently=False)
            mailer.stop=mailer.stop+1
            mailer.save()
        return HttpResponse('Mails Sent. :)<br/>'+to_mails)
    else:
        raise Http404


def mailer(request):
    if(request.user.is_superuser):
        form = MailerForm() # An unbound form
        return render(request, 'mailer.html', {'form': form,})
    else:
        raise Http404
    