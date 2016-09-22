from django.shortcuts import render


def index(request):
    return render(request,'static/peace/sankalp.html')
