from rest_framework import serializers
from .models import Cart, CartItem
from product_management.models import Land
from product_management.serializers import LandSerializer

class CartItemSerializer(serializers.ModelSerializer):
    land = serializers.PrimaryKeyRelatedField(queryset=Land.objects.all())

    class Meta:
        model = CartItem
        fields = ['id', 'land', 'added_at']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']
