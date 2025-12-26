"""
Django settings for backend project.
"""

from pathlib import Path
import sys

# =========================
# BASE DIR
# =========================
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR.parent))

# =========================
# SECURITY
# =========================
SECRET_KEY = "django-insecure-dev-key-change-later"
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# =========================
# APPLICATIONS
# =========================
INSTALLED_APPS = [
    # Django core
    "django.contrib.auth",
    "django.contrib.contenttypes",

    # Third-party
    "corsheaders",
    "rest_framework",

    # Local apps
    "api",
]

# =========================
# MIDDLEWARE
# =========================
MIDDLEWARE = [
    # CORS MUST BE FIRST
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
]

# =========================
# REST FRAMEWORK
# =========================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_PERMISSION_CLASSES": [],
}

# =========================
# CORS CONFIG
# =========================
CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
]

CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
]

# =========================
# URLS / WSGI
# =========================
ROOT_URLCONF = "backend.urls"
WSGI_APPLICATION = "backend.wsgi.application"

# =========================
# DATABASE
# =========================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# =========================
# PASSWORD VALIDATION
# =========================
AUTH_PASSWORD_VALIDATORS = []

# =========================
# INTERNATIONALIZATION
# =========================
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# =========================
# STATIC & MEDIA FILES
# =========================
STATIC_URL = "/static/"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "data"

# =========================
# DEFAULT PRIMARY KEY
# =========================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
