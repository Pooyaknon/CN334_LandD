from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from user_management.models import Customer

class UserManagementAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_create_user(self):
        url = '/api/register/'
        data = {
            'username': 'newuser',
            'password': 'newpass',
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        customer = Customer.objects.get(user__username='newuser')
        self.assertEqual(customer.email, 'newuser@example.com')

    def test_login_user(self):
        url = '/api/token/'
        data = {
            'username': 'testuser',
            'password': 'testpass'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)