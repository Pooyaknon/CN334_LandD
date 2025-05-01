from django.shortcuts import render, redirect, get_object_or_404
from .models import Order, PaymentMethod, DeliveryMethod
from product_management.models import Land
from user_service.models import User

# Create your views here.
def confirm_order(request, user_id, land_id):
    user = get_object_or_404(User, id=user_id)
    land = get_object_or_404(Land, id=land_id)
    payments = PaymentMethod.objects.all()
    deliveries = DeliveryMethod.objects.all()
    return render(request, 'order/order_confirm.html', {
        'user': user,
        'land': land,
        'payments': payments,
        'deliveries': deliveries
    })

def place_order(request):
    if request.method == "POST":
        user = get_object_or_404(User, id=request.POST['user_id'])
        land = get_object_or_404(Land, id=request.POST['land_id'])
        payment_method = get_object_or_404(PaymentMethod, id=request.POST['payment_method_id'])
        delivery_method = get_object_or_404(DeliveryMethod, id=request.POST['delivery_method_id'])

        order = Order.objects.create(
            user=user,
            land=land,
            payment_method=payment_method,
            delivery_method=delivery_method,
            status='pending'
        )
        land.is_sold = True
        land.save()
        return render(request, 'order/order_success.html', {'order': order})
