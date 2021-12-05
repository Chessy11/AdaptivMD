from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure--nsg+uc+fwq^z$&pcng!v5*!*1_5*xs8$=ms$*si5((m&m=r7o'

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*'] 


EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'info@adaptivmd.us'
EMAIL_HOST_PASSWORD = ''
DEFAULT_FROM_EMAIL = 'info@adaptivmd.us'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
SERVER_EMAIL = 'info@adaptivmd.us'


try:
    from .local import *
except ImportError:
    pass
