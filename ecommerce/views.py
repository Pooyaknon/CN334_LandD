from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def ecommerce_index_view(request):
    '''This function render index page of ecommerce views'''
    
    return HttpResponse('Welcome to [Your student_id] [Your name] [Your lastname] views!')