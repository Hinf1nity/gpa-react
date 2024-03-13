from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .actividades.views import GestionView
from .auth.views import UserAuth

router = routers.DefaultRouter()
router.register(r'auth', UserAuth)
router.register(r'actividades', GestionView)

urlpatterns = [
    path('', include(router.urls)),
]
