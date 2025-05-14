from rest_framework.test import APIClient
from django.contrib.auth.models import User
from product_management.models import Land, Category, LandType
from cart.models import Cart, CartItem
from rest_framework import status
from django.test import TestCase

class CartAPITestCase(TestCase):
    def setUp(self):
        # สร้าง APIClient เพื่อทดสอบ
        self.client = APIClient()

        # สร้าง user
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)

        # สร้าง category และ land type สำหรับ test
        self.category = Category.objects.create(name='central')
        self.land_type = LandType.objects.create(type_name='Residential')

        # สร้าง land สำหรับ test
        self.land = Land.objects.create(
            title="Test Land",
            price=1000000,
            size=500,
            location="Test Location",
            land_type=self.land_type,
            category=self.category,
            description="Nice land"
        )

    def test_add_to_cart(self):
        # ส่งข้อมูลเป็น JSON
        response = self.client.post('/api/carts/', {'items': [{'land': self.land.id}]}, format='json')

        # ตรวจสอบว่า response status คือ 201 (created)
        self.assertEqual(response.status_code, 201)

        # ตรวจสอบว่า Cart ถูกสร้างขึ้น 1 รายการ
        self.assertEqual(Cart.objects.count(), 1)

        # ตรวจสอบว่า CartItem ถูกเพิ่มไปใน Cart
        cart = Cart.objects.first()
        self.assertEqual(cart.items.count(), 1)
        self.assertEqual(cart.items.first().land.id, self.land.id)

    def test_add_item_to_cart(self):
        # สร้าง Cart ใหม่หรือดึง Cart เดิมของผู้ใช้
        response = self.client.post('/api/carts/', {'items': [{'land': self.land.id}]}, format='json')

        # ตรวจสอบว่า CartItem ถูกสร้างขึ้นใน Cart
        self.assertEqual(CartItem.objects.count(), 1)

        cart = Cart.objects.first()
        cart_item = CartItem.objects.first()

        # ตรวจสอบว่า CartItem เชื่อมโยงกับ Cart และ Land ที่ถูกต้อง
        self.assertEqual(cart_item.cart, cart)
        self.assertEqual(cart_item.land.id, self.land.id)