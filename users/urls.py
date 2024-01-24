from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PuntosDataView, StudentDataView, ActivitiesDataView

router = DefaultRouter()
router.register(r'puntos', PuntosDataView, basename='estudiantes')
router.register(r'estudiante', StudentDataView, basename='puntos')
router.register(r'actividades', ActivitiesDataView, basename='actividades')

urlpatterns = [
    path('', include(router.urls)),
]
