from django.shortcuts import render
from django.template import RequestContext


def signup(request):
    pass


def handler404(request, exception):
    context = {}
    response = render(request, '404.html', context=context)
    response.status_code = 404
    return response


def handler500(request, *args, **argv):
    context = {}
    response = render(request, '500.html', context=context)
    response.status_code = 500
    return response