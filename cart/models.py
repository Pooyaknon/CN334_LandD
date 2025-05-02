from django.db import models
from product_management.models import Land
from django.contrib.auth.models import User

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    land = models.ForeignKey(Land, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)