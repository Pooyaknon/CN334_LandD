# Generated by Django 5.2 on 2025-05-14 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_management', '0003_alter_category_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(choices=[('ภาคเหนือ', 'ภาคเหนือ'), ('ภาคกลาง', 'ภาคกลาง'), ('ภาคตะวันออกเฉียงเหนือ', 'ภาคตะวันออกเฉียงเหนือ'), ('ภาคตะวันออก', 'ภาคตะวันออก'), ('ภาคตะวันตก', 'ภาคตะวันตก'), ('ภาคใต้', 'ภาคใต้')], max_length=50),
        ),
    ]
