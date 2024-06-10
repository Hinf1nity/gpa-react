from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from gestion.models import estudiante, puntos
from gestion.serializer import PuntosSerializer


class PuntosDataView(viewsets.ReadOnlyModelViewSet):
    queryset = puntos.objects.all()
    serializer_class = PuntosSerializer

    def retrieve(self, request, pk=None):
        ci_user = pk
        if ci_user == "0":
            return Response({"detail": "Estudiante no registrado"}, status=404)
        else:
            id_estudiante = estudiante.objects.get(ci=ci_user)
            puntos_gpa = puntos.objects.filter(estudiante=id_estudiante)
            serializer = self.get_serializer(puntos_gpa, many=True)
            return Response(serializer.data)
