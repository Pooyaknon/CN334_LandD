from rest_framework import viewsets
from .models import Land, LandType, Category, Promotion, LandImage
from .serializers import LandSerializer, LandTypeSerializer, CategorySerializer, PromotionSerializer, LandImageSerializer

class LandViewSet(viewsets.ModelViewSet):
    queryset = Land.objects.all().order_by('-created_at')
    serializer_class = LandSerializer

class LandTypeViewSet(viewsets.ModelViewSet):
    queryset = LandType.objects.all()
    serializer_class = LandTypeSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

class LandImageViewSet(viewsets.ModelViewSet):
    queryset = LandImage.objects.all()
    serializer_class = LandImageSerializer
