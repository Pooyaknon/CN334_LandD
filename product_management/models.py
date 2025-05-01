from django.db import models

# Create your models here.
class LandType(models.Model):
    type_name = models.CharField(max_length=50)

    def __str__(self):
        return self.type_name

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Promotion(models.Model):
    name = models.CharField(max_length=100)
    discount_percent = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name

class Land(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    size = models.FloatField()
    is_sold = models.BooleanField(default=False)
    land_type = models.ForeignKey(LandType, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    promotion = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class LandImage(models.Model):
    land = models.ForeignKey(Land, on_delete=models.CASCADE, related_name='images')
    image_url = models.CharField(max_length=255)

    def __str__(self):
        return f"Image of {self.land.title}"
