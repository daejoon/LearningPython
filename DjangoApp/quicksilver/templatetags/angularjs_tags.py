__author__ = 'kdj'

from django import template

register = template.Library()

class AngularJS(template.Node):
    def __init__(self, bits):
        self.ng = bits

    def render(self, context):
        return "{{ %s }}" % " ".join(self.ng[1:])

@register.tag(name='ng')
def do_angularjs_tag(parser, token):
    bits = token.split_contents()
    return AngularJS(bits)

