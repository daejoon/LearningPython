__author__ = 'kdj'

from django import template
from django.template.base import Node, NodeList, TextNode, VariableNode

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

class AngularJsNode(Node):
    def __init__(self, django_nodelist, angular_nodelist, variable):
        self.django_nodelist = django_nodelist
        self.angular_nodelist = angular_nodelist
        self.variable = variable

    def render(self, context):
        if self.variable.resolve(context):
            return self.angular_nodelist.render(context)
        return self.django_nodelist.render(context)


@register.tag(name="angularjs")
def angularjs(parser, token):
    """
    Conditionally switch between AngularJS and Django variable expansion for ``{{`` and ``}}``
    keeping Django's expansion for ``{%`` and ``%}``
    Usage::
        {% angularjs 1 %} or simply {% angularjs %}
            {% process variables through the AngularJS template engine %}
        {% endangularjs %}
        {% angularjs 0 %}
            {% process variables through the Django template engine %}
        {% endangularjs %}
        Instead of 0 and 1, it is possible to use a context variable.
    """
    bits = token.contents.split()
    if len(bits) < 2:
        bits.append('1')
    values = [parser.compile_filter(bit) for bit in bits[1:]]
    django_nodelist = parser.parse(('endangularjs',))
    angular_nodelist = NodeList()
    for node in django_nodelist:
        # convert all occurrences of VariableNode into a TextNode using the
        # AngularJS double curly bracket notation
        if isinstance(node, VariableNode):
            # convert Django's array notation into JS array notation
            tokens = node.filter_expression.token.split('.')
            token = tokens[0]
            for part in tokens[1:]:
                if part.isdigit():
                    token += '[%s]' % part
                else:
                    token += '.%s' % part
            node = TextNode('{{ %s }}' % token)
        angular_nodelist.append(node)
    parser.delete_first_token()
    return AngularJsNode(django_nodelist, angular_nodelist, values[0])

