from django import template
from django.conf import settings

register = template.Library()

@register.assignment_tag(takes_context=True)
def get_my_setting(context):
    return getattr(settings, 'MY_SETTING', '')
