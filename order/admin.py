from django.contrib import admin
from .models import Order, PaymentMethod, DeliveryMethod

admin.site.register(Order)
admin.site.register(PaymentMethod)
admin.site.register(DeliveryMethod)
