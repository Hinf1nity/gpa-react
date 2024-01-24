from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .views import UserAuth, GestionView

router = routers.DefaultRouter()
router.register(r'auth', UserAuth)
router.register(r'actividades', GestionView)

urlpatterns = [
    path('', include(router.urls)),
]
