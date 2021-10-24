from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from wagtail.snippets.models import register_snippet


@register_snippet
class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20,null=False)
    def __str__(self):
         return self.name
class UserManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, phone, password=None):
        if not email:
            raise ValueError('Email Is Required')
        if not username:
            raise ValueError('Username Is Required')
        if not first_name:
            raise ValueError("First Name Is Required")
        if not last_name:
            raise ValueError("Last Name Is Required")
        if not phone:
            pass
        
 
        user = self.model(
                      email=self.normalize_email(email),
                      username=username,
                      first_name=first_name,
                      last_name=last_name,
                      phone=phone,
                      password=password,)
        user.password = make_password(user.password)
        user.save()
        return user

def create_superuser(self, email, username,first_name,last_name, phone,  password):
    user = self.create_user(email=self.normalize_email(email),
                            password=password,
                            username=username,
                            first_name=first_name,
                            last_name=last_name,
                            phone=phone,
                            )
    user.is_admin = True
    user.is_staff = True
    user.is_superuser = True
    user.save()
    return user
class User(AbstractBaseUser):
    class Meta:
        verbose_name = 'User'
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, verbose_name="username", unique=True)
    password = models.CharField(verbose_name="password", max_length=1000)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(verbose_name="name", max_length=20)
    last_name = models.CharField(max_length=20, verbose_name="last name")
    phone = models.CharField(max_length=20,unique=True, verbose_name="phone number")
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name','last_name', 'email']
    
    objects = UserManager()
    
    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)
    
    def __int__(self):
        return self.id
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
    def get_id(self):
        return self.id