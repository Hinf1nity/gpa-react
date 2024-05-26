from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .views import MateriasViewSet, licenciasViewSet

router = routers.DefaultRouter()
router.register(r'materias', MateriasViewSet)
router.register(r'create_licencias', licenciasViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
