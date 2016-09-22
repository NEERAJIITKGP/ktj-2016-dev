from django import forms
from myktj.models import Profile,State,Institute


STATES={}
INSTITUTES={}

class MailerForm(forms.Form):
    states = forms.MultipleChoiceField()
    institutes= forms.MultipleChoiceField()
    to_email=forms.CharField(widget=forms.Textarea,required=False)
    subject=forms.CharField(widget=forms.Textarea)
    message=forms.CharField(widget=forms.Textarea)
    from_email=forms.CharField()
    
    def __init__(self, *args, **kwargs):
        super(MailerForm, self).__init__(*args, **kwargs)
        st=State.objects.all()
        for stat in st:
            STATES[stat.state]=stat.state
        self.fields['states'].choices=STATES.items()
        insti=Institute.objects.all()
        for inst in insti:
           INSTITUTES[inst.institute]=inst.institute
        self.fields['institutes'].choices=INSTITUTES.items()