from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class AccountManager(BaseUserManager):
    def create_user(self, username, phone_number, password=None):
        # if not email:
        #     raise ValueError("User must have an email address")
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(
            # email=self.normalize_email(email),
            username=username,
            phone_number=phone_number
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, phone_number, password):
        user = self.create_user(
            # email=self.normalize_email(email),
            password=password,
            username=username,
            phone_number=phone_number
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="E-Mail", max_length=100, unique=True)
    phone_number = PhoneNumberField(verbose_name="Номер телефона", unique=True)
    username = models.CharField(verbose_name="Доменное имя пользователя", max_length=30, unique=True)
    first_name = models.CharField(verbose_name="Имя", max_length=30)
    last_name = models.CharField(verbose_name="Фамилия", max_length=30)

    telegram_user_id = models.PositiveIntegerField(verbose_name="ID пользователя в Telegram", blank=True, null=True)

    date_joined = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='Дата последнего входа', auto_now=True)

    is_admin = models.BooleanField(verbose_name="Администратор", default=False)
    is_active = models.BooleanField(verbose_name="Включен", default=True)
    is_staff = models.BooleanField(verbose_name="Сотрудник", default=False)
    is_superuser = models.BooleanField(verbose_name="Супер-пользователь", default=False)

    can_use_bot = models.BooleanField(verbose_name="Пользователь бота", default=False)
    can_edit_data = models.BooleanField(verbose_name="Может редактировать данные", default=False)

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["phone_number"]

    objects = AccountManager()

    class Meta:
        verbose_name = "Аккаунт"
        verbose_name_plural = "Аккаунты"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.username

    def __str__(self):
        return f"{self.get_full_name()} ({self.get_short_name()})"

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_perms(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin
