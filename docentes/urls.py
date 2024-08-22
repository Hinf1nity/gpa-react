from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .auth.views import UserAuth
from .views import DocentesLicenciasView

router = routers.DefaultRouter()
router.register(r'auth', UserAuth)
router.register(r'licencias', DocentesLicenciasView)

urlpatterns = [
    path('', include(router.urls)),
]
