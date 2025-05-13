from rest_framework import serializers
from .models import Cart, CartItem
from product_management.models import Land
from product_management.serializers import LandSerializer

class CartItemSerializer(serializers.ModelSerializer):
    # ให้ land ส่งเป็น ID มาจาก frontend
    land = serializers.PrimaryKeyRelatedField(queryset=Land.objects.all())

    class Meta:
        model = CartItem
        fields = ['id', 'land', 'added_at']


class CartSerializer(serializers.ModelSerializer):
    # ทำให้สามารถรับ items มาจาก frontend ได้
    items = CartItemSerializer(many=True, write_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']
        read_only_fields = ['user']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        user = self.context['request'].user
        cart = Cart.objects.create(user=user)
        for item_data in items_data:
            CartItem.objects.create(cart=cart, **item_data)
        return cart