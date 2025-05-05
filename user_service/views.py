from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful", "user": UserSerializer(user).data, "token": token.key})
    else:
        return Response({"error": "Invalid credentials"}, status=400)
    
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logout successful"})

@api_view(['GET'])
def current_user(request):
    if request.user.is_authenticated:
        return Response(UserSerializer(request.user).data)
    return Response({"error": "Not authenticated"}, status=401)
