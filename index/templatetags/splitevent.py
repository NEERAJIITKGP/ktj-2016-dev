from django import template

register = template.Library()

@register.filter
def splitevent(value,arg):
	if arg == 'name':
		return value.partition(';')[0]
	elif arg == 'liner':
		return value.partition(';')[2]