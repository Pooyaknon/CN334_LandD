from django.shortcuts import render, redirect, get_object_or_404
from .models import Cart, CartItem
from product_management.models import Land
from user_service.models import User

# Create your views here.
def view_cart(request, user_id):
    user = get_object_or_404(User, id=user_id)
    cart, _ = Cart.objects.get_or_create(user=user)
    items = CartItem.objects.filter(cart=cart)
    return render(request, 'cart/cart.html', {'cart': cart, 'items': items})

def add_to_cart(request, user_id, land_id):
    user = get_object_or_404(User, id=user_id)
    land = get_object_or_404(Land, id=land_id)
    cart, _ = Cart.objects.get_or_create(user=user)
    CartItem.objects.create(cart=cart, land=land)
    return redirect('view_cart', user_id=user.id)
