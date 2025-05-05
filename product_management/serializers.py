from rest_framework import serializers
from .models import Land, LandImage, LandType, Category, Promotion

class LandImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandImage
        fields = ['id', 'image_url']

class LandSerializer(serializers.ModelSerializer):
    images = LandImageSerializer(many=True, read_only=True)
    size = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Land
        fields = ['id', 'title', 'description', 'location', 'price', 'size',
                  'is_sold', 'land_type', 'category', 'promotion', 'created_at', 'images']

class LandTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandType
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'