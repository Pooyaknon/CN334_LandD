from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from product_management.models import Land, Promotion, LandImage, Category, LandType
from order.models import Order, PaymentMethod, DeliveryMethod
from datetime import date, timedelta

class OrderAPITestCase(APITestCase):
    def setUp(self):
        # สร้าง user และ login
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')

        # สร้าง LandType
        self.land_type = LandType.objects.create(type_name="Residential")

        # สร้าง Category
        self.category = Category.objects.create(name="north")  # ใส่ค่าที่จำเป็น

        # สร้าง Promotion
        self.promo = Promotion.objects.create(
            name="Test Promo",
            discount_percent=10,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=30)
        )

        # สร้าง Land
        self.land = Land.objects.create(
            title="Test Land",
            description="A test land",
            location="Test Location",
            price=100000.00,
            size=50.0,
            is_sold=False,
            land_type=self.land_type,  # ระบุ land_type
            category=self.category,     # ระบุ category
            promotion=self.promo       # ระบุ promotion
        )

        # เพิ่มรูปภาพให้ land
        LandImage.objects.create(land=self.land, image_url="http://example.com/image.jpg")

        # สร้าง PaymentMethod และ DeliveryMethod
        self.payment_method = PaymentMethod.objects.create(method_name="Credit Card")
        self.delivery_method = DeliveryMethod.objects.create(method_name="Standard Shipping")

    def test_create_order(self):
        url = reverse('order-list')  # URL สำหรับการสร้างคำสั่งซื้อ (Order)
        data = {
            'land': self.land.id,
            'payment_method': self.payment_method.id,
            'delivery_method': self.delivery_method.id,
            'user': self.user.id,  # หาก Order model ต้องการ user
        }

        # ทำการทดสอบการสร้าง order
        response = self.client.post(url, data, format='json')

        # ตรวจสอบผลลัพธ์
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)
        order = Order.objects.first()
        self.assertEqual(order.user, self.user)
        self.assertEqual(order.land, self.land)
        self.assertEqual(order.payment_method, self.payment_method)
        self.assertEqual(order.delivery_method, self.delivery_method)