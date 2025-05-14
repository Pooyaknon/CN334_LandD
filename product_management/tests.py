from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from product_management.models import Land, LandType, Category, Promotion

class ProductManagementAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')

        # สร้าง LandType
        self.land_type = LandType.objects.create(type_name="Residential")

        # สร้าง Category
        self.category = Category.objects.create(name="north")

        # สร้าง Promotion
        self.promo = Promotion.objects.create(
            name="Test Promo",
            discount_percent=10,
            start_date="2025-05-01",
            end_date="2025-05-31"
        )

    def test_create_land(self):
        url = '/api/lands/'
        data = {
            'title': 'Test Land',
            'description': 'Test Description',
            'location': 'Test Location',
            'price': 100000.00,
            'size': 50.0,
            'land_type': self.land_type.id,
            'category': self.category.id,
            'promotion': self.promo.id,
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Land.objects.count(), 1)
        land = Land.objects.first()
        self.assertEqual(land.title, 'Test Land')

    def test_list_lands(self):
        Land.objects.create(
            title='Test Land 1',
            description='Test Description 1',
            location='Test Location 1',
            price=100000.00,
            size=50.0,
            land_type=self.land_type,
            category=self.category,
            promotion=self.promo
        )

        url = '/api/lands/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
