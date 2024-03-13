from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .estudiante.views import StudentDataView
from .puntos.views import PuntosDataView
from .actividades.views import ActivitiesDataView

router = DefaultRouter()
router.register(r'puntos', PuntosDataView, basename='estudiantes')
router.register(r'estudiante', StudentDataView, basename='puntos')
router.register(r'actividades', ActivitiesDataView, basename='actividades')

urlpatterns = [
    path('', include(router.urls)),
]
