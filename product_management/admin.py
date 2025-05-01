from django.contrib import admin
from .models import Land, LandType, Category, Promotion, LandImage

# Register your models here.
admin.site.register(Land)
admin.site.register(LandType)
admin.site.register(Category)
admin.site.register(Promotion)
admin.site.register(LandImage)
