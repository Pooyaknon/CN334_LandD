from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user_management.views import *
from product_management.views import LandViewSet, LandTypeViewSet, CategoryViewSet, PromotionViewSet, LandImageViewSet
from order.views import OrderViewSet, PaymentMethodViewSet, DeliveryMethodViewSet
from cart.views import CartViewSet, CartItemViewSet

# Set up routers for API viewsets
router = DefaultRouter()
router.register(r'lands', LandViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'payment-methods', PaymentMethodViewSet)
router.register(r'delivery-methods', DeliveryMethodViewSet)
router.register(r'carts', CartViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'land-types', LandTypeViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'promotions', PromotionViewSet)
router.register(r'land-images', LandImageViewSet)

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # API Routes
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),
    # User Authentication & Info
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('api/customers/', CustomerListView.as_view(), name='customer_list'), 
    path('api/customers/<int:id>/', CustomerDetailView.as_view(), name='customer_detail'),
]