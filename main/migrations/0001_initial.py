# Generated by Django 3.0.4 on 2020-05-13 16:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cartridge',
            fields=[
                ('manufacturer', models.CharField(choices=[('HP', 'HP'), ('Kyocera', 'Kyocera'), ('Samsung', 'Samsung')], default='HP', max_length=30, verbose_name='Производитель')),
                ('name', models.CharField(db_column='cartridge_name', help_text='Наименование картриджа должно быть уникальным', max_length=30, primary_key=True, serialize=False, unique=True, verbose_name='Название картриджа')),
                ('count', models.PositiveIntegerField(verbose_name='Количество')),
            ],
        ),
        migrations.CreateModel(
            name='Supply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('out', models.BooleanField(choices=[(True, 'Выдача'), (False, 'Поступление')], default=True, verbose_name='Тип передвижения')),
                ('date', models.DateTimeField(auto_now=True)),
                ('count', models.PositiveIntegerField(verbose_name='Количество')),
                ('comment', models.CharField(blank=True, max_length=150, verbose_name='Комментарий')),
                ('cartridge', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='supplies', to='main.Cartridge', verbose_name='Тип картриджа')),
            ],
        ),
    ]