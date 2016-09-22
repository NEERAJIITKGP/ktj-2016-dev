from django import template

register = template.Library()

@register.filter
def lowertrim(value):
	return ''.join(value.lower().split())