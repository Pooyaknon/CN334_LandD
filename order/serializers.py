from rest_framework import serializers
from .models import Order, PaymentMethod, DeliveryMethod

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    land_name = serializers.CharField(source='land.title', read_only=True)
    land_price = serializers.DecimalField(source='land.price', max_digits=12, decimal_places=2, read_only=True)
    land_size = serializers.FloatField(source='land.size', read_only=True)
    land_location = serializers.CharField(source='land.location', read_only=True)
    land_promotion = serializers.CharField(source='land.promotion.name', read_only=True, default=None)
    land_discount_percent = serializers.IntegerField(source='land.promotion.discount_percent', read_only=True, default=0)
    land_image = serializers.SerializerMethodField()

    payment_method_name = serializers.CharField(source='payment_method.name', read_only=True)
    delivery_method_name = serializers.CharField(source='delivery_method.name', read_only=True)

    def get_land_image(self, obj):
        first_image = obj.land.images.first()
        return first_image.image_url if first_image else None

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'land', 'land_name', 'land_price', 'land_size',
            'land_location', 'land_promotion', 'land_discount_percent', 'land_image',
            'payment_method', 'payment_method_name',
            'delivery_method', 'delivery_method_name',
            'order_date', 'status'
        ]

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMethod
        fields = '__all__'