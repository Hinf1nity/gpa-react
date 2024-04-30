from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from licencias.models import materias, permisos
from .models import estudiante
from licencias.serializer import MateriasSerializer, LicenciasSerializer
from .serializer import PermisoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class GestionLicenciasView(viewsets.ViewSet):
    queryset = permisos.objects.all()
    serializer_class = LicenciasSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        permisos_list = []
        existing_ids = []
        for id_key in permisos.objects.all():
            if id_key.estado == 'Pendiente':
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
                        "id": id_key.id_solicitud,
                        "materia": materia_list,
                        "justificacion": id_key.justificacion,
                        "descripcion": id_key.descripcion,
                        "fechaSolicitud": id_key.fechaSolicitud,
                        "estado": id_key.estado,
                        "motivo": id_key.motivo,
                        "estudiante": estudiante_name,
                    })
                    existing_ids.append(id_key.id_solicitud)
        serializer = PermisoSerializer(permisos_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
