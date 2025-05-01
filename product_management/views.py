from django.shortcuts import render, get_object_or_404
from .models import Land

# Create your views here.
def all_products(request):
    lands = Land.objects.filter(is_sold=False).order_by('-created_at')
    return render(request, 'product_management/land_list.html', {'lands': lands})

def product_by_id(request, id):
    land = get_object_or_404(Land, id=id)
    return render(request, 'product_management/land_detail.html', {'land': land})
