# Generated by Django 4.2.13 on 2025-05-13 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_alter_deliverymethod_method_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deliverymethod',
            name='method_name',
            field=models.CharField(choices=[('Pickup', 'รับโฉนดที่สำนักงาน'), ('Appointment', 'นัดรับโฉนด')], max_length=50),
        ),
        migrations.AlterField(
            model_name='paymentmethod',
            name='method_name',
            field=models.CharField(choices=[('Mobile Banking', 'Mobile Banking'), ('Credit Card', 'Credit Card')], max_length=50),
        ),
    ]
