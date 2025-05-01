from django.db import models
from product_management.models import Land
from user_service.models import User

# Create your models here.
class PaymentMethod(models.Model):
    method_name = models.CharField(max_length=50)

    def __str__(self):
        return self.method_name

class DeliveryMethod(models.Model):
    method_name = models.CharField(max_length=50)

    def __str__(self):
        return self.method_name

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('delivered', 'Delivered'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    land = models.ForeignKey(Land, on_delete=models.CASCADE)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    delivery_method = models.ForeignKey(DeliveryMethod, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Order #{self.id} by {self.user.name}"
