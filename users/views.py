from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from gestion.models import estudiante, puntos, actividades
from gestion.serializer import GestionSerializer, PuntosSerializer, ActividadesSerializer


class PuntosDataView(viewsets.ReadOnlyModelViewSet):
    queryset = puntos.objects.all()
    serializer_class = PuntosSerializer
    authentication_classes = []  # No requiere autenticación
    permission_classes = [AllowAny]  # Permite cualquier acceso

    def retrieve(self, request, *args, **kwargs):
        ci_user = kwargs.get('pk')
        if ci_user == "0":
            return Response({"detail": "Estudiante no registrado"}, status=404)
        else:
            id_estudiante = estudiante.objects.get(ci=ci_user)
            puntos_gpa = puntos.objects.filter(estudiante=id_estudiante)
            serializer = self.get_serializer(puntos_gpa, many=True)
            return Response(serializer.data)


class StudentDataView(viewsets.ReadOnlyModelViewSet):
    queryset = estudiante.objects.all()
    serializer_class = GestionSerializer
    authentication_classes = []  # No requiere autenticación
    permission_classes = [AllowAny]  # Permite cualquier acceso

    def retrieve(self, request, *args, **kwargs):
        ci_user = kwargs.get('pk')
        id_estudiante = estudiante.objects.filter(ci=ci_user)
        if not id_estudiante:
            return Response({"detail": "No se encontro el estudiante"}, status=404)
        serializer = self.get_serializer(id_estudiante, many=True)
        return Response(serializer.data)


class ActivitiesDataView(viewsets.ReadOnlyModelViewSet):
    queryset = actividades.objects.all()
    serializer_class = ActividadesSerializer
    authentication_classes = []  # No requiere autenticación
    permission_classes = [AllowAny]  # Permite cualquier acceso
