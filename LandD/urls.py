"""
URL configuration for LandD project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

# import views from each app
from cart import views as cart_views
from order import views as order_views
from product_management import views as product_views
# สมมุติว่าใช้ user_service สำหรับ login/logout/register
from user_service import views as user_views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Cart
    path('cart/<int:user_id>/', cart_views.view_cart, name='view_cart'),
    path('cart/add/<int:user_id>/<int:land_id>/', cart_views.add_to_cart, name='add_to_cart'),

    # Order
    path('order/confirm/<int:user_id>/<int:land_id>/', order_views.confirm_order, name='confirm_order'),
    path('order/place/', order_views.place_order, name='place_order'),

    # Product
    path('product/all/', product_views.list_all_lands, name='all_lands'),
    path('product/<int:id>/', product_views.land_detail, name='land_detail'),

    # User (login/logout/register)
    path('login/', user_views.login_view, name='login'),
    path('logout/', user_views.logout_view, name='logout'),
    path('register/', user_views.register_view, name='register'),

    # Homepage
    path('', product_views.homepage, name='homepage'),
]

# for media (image upload)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
