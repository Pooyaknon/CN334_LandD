from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .serializers import AdminUserSerializer

class AdminOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [AdminOnlyPermission]
