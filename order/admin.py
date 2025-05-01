from django.contrib import admin
from .models import Order, PaymentMethod, DeliveryMethod

# Register your models here.
admin.site.register(Order)
admin.site.register(PaymentMethod)
admin.site.register(DeliveryMethod)
