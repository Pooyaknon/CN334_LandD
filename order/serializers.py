from rest_framework import serializers
from .models import Order, PaymentMethod, DeliveryMethod

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMethod
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    land_name = serializers.CharField(source='land.name', read_only=True)
    payment_method_name = serializers.CharField(source='payment_method.method_name', read_only=True)
    delivery_method_name = serializers.CharField(source='delivery_method.method_name', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'land', 'land_name',
            'payment_method', 'payment_method_name',
            'delivery_method', 'delivery_method_name',
            'order_date', 'status'
        ]