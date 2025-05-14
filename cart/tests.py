from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from product_management.models import Land, Category, LandType
from cart.models import Cart

class CartAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(name='central')

        self.land_type = LandType.objects.create(type_name='Residential')

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
        response = self.client.post('/api/carts/', {'land_id': self.land.id})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Cart.objects.count(), 1)

    def test_checkout_cart(self):
        self.client.post('/api/carts/', {'land_id': self.land.id})
        response = self.client.post('/api/carts/checkout/')
        self.assertEqual(response.status_code, 201)