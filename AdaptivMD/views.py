from django.shortcuts import render

def error_404(request, exception):
        data = {}
        return render(request,'AdaptivMD/404.html', data)

def error_500(request,  exception):
        data = {}
        return render(request,'AdaptivMD/500.html', data)