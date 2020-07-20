from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models


class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(
            email=self.normalize_email(email),
            username=username
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name="E-Mail", max_length=100, unique=True)
    telephone_num = models.PositiveIntegerField(verbose_name="Номер телефона", unique=True)
    username = models.CharField(verbose_name="Доменное имя пользователя", max_length=30, unique=True)
    first_name = models.CharField(verbose_name="Имя", max_length=30)
    last_name = models.CharField(verbose_name="Фамилия", max_length=30)

    date_joined = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='Дата последнего входа', auto_now=True)

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['username']

    objects = AccountManager()

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
