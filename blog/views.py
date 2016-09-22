from django.shortcuts import render
from blog.models import Post


def kronicle(request, post='OverView'):
    if post=='OverView':
        output=-1
        meta="The 13th edition of Asia's largest techno-management fest, conducted by IIT Kharagpur."
        metaImg='http://www.ktj.in/static/Blog/images/logo.png'
        title='Kronicle, The official Blog of Kshitij'
    else:
        output=int(post)
        meta=Post.objects.get(id=output).meta
        metaImg=Post.objects.get(id=output).metaImg
        title=Post.objects.get(id=output).title
    
    posts=Post.objects.all()    
    cntxt={
    'output' : output,
    'posts': posts,
    'meta': meta,   
    'metaImg': metaImg,
    'title':title,
    }
    return render(request,'kronicle.html',cntxt)
    