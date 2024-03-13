from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from gestion.models import actividades
from gestion.serializer import ActividadesSerializer


class ActivitiesDataView(viewsets.ReadOnlyModelViewSet):
    queryset = actividades.objects.all()
    serializer_class = ActividadesSerializer
    authentication_classes = []  # No requiere autenticación
    permission_classes = [AllowAny]  # Permite cualquier acceso
