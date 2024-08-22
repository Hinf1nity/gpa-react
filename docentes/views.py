from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from licencias.models import permisos
from gestion.models import estudiante
from .serializer import PermisoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.


class DocentesLicenciasView(viewsets.ViewSet):
    queryset = permisos.objects.all()
    serializer_class = PermisoSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

    def list(self, request):
        permisos_list = []
        existing_ids = []
        for id_key in permisos.objects.all():
            if id_key.estado == 'Aceptado':
                if id_key.id_solicitud not in existing_ids:
                    permiso_group = permisos.objects.filter(
                        id_solicitud=id_key.id_solicitud)
                    estudiante_name = estudiante.objects.get(
                        id=permiso_group[0].project_id).nombre
                    materia_list = []
                    for permiso in permiso_group:
                        materia_list.append(
                            {"materia": permiso.materia, "fecha": permiso.fecha})
                    permisos_list.append({
                        "id": id_key.id,
                        "materia": materia_list,
                        "fechaSolicitud": id_key.fechaSolicitud,
                        "estudiante": estudiante_name,
                    })
                    existing_ids.append(id_key.id_solicitud)
        serializer = PermisoSerializer(
            data=permisos_list, many=True)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
