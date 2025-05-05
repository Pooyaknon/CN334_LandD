from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from product_management.views import LandViewSet, LandTypeViewSet, CategoryViewSet, PromotionViewSet, LandImageViewSet
from order.views import OrderViewSet, PaymentMethodViewSet, DeliveryMethodViewSet
from user_service.views import RegisterView, login_view, logout_view, current_user
from user_management.views import AdminUserViewSet
from cart.views import CartViewSet, CartItemViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'lands', LandViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'payment-methods', PaymentMethodViewSet)
router.register(r'delivery-methods', DeliveryMethodViewSet)
router.register(r'carts', CartViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'admin/users', AdminUserViewSet)
router.register(r'land-types', LandTypeViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'promotions', PromotionViewSet)
router.register(r'land-images', LandImageViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/user/', current_user, name='current_user'),
    path('api/token/', obtain_auth_token, name='api_token_auth'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
