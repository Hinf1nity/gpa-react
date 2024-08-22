from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .actividades.views import GestionView
from .auth.views import UserAuth
from .estudiantes.views import EstudiantesView
from .licencias.views import GestionLicenciasView

router = routers.DefaultRouter()
router.register(r'auth', UserAuth)
router.register(r'actividades', GestionView)
router.register(r'estudiantes', EstudiantesView)
router.register(r'licencias', GestionLicenciasView)

urlpatterns = [
    path('', include(router.urls)),
]
