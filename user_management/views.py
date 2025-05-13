from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User
from user_management.models import Customer
from user_management.serializers import CustomerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView

# Register API (for creating a new user and customer)
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = JSONParser().parse(request)

        # สร้าง User ใหม่
        try:
            new_user = User.objects.create_user(
                username=data['username'],
                password=data['password']
            )
        except:
            return JsonResponse({"error": "username already used."}, status=400)

        new_user.save()

        # เพิ่ม user ID ไปในข้อมูล customer
        data['user'] = new_user.id

        # สร้าง Customer จาก serializer
        customer_serializer = CustomerSerializer(data=data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse(customer_serializer.data, status=201)

        # หากข้อมูลไม่ valid ให้ลบ user ที่สร้างไปแล้ว
        new_user.delete()
        return JsonResponse({"error": "data not valid"}, status=400)

    return JsonResponse({"error": "method not allowed."}, status=405)

# CustomerView for authenticated user
class CustomerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            # ดึงข้อมูล customer ตาม user ที่ล็อกอิน
            customer_data = Customer.objects.get(user=request.user)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=404)

        customer_serializer = CustomerSerializer(customer_data)
        return Response({"data": customer_serializer.data})

# List all customers
class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

# Get a single customer by ID
class CustomerDetailView(generics.RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
