from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
from licencias.models import materias, permisos
from .models import estudiante
from licencias.serializer import MateriasSerializer, LicenciasSerializer
from .serializer import PermisoSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication


class GestionLicenciasView(viewsets.ViewSet):
    queryset = permisos.objects.all()
    serializer_class = LicenciasSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

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
                    if id_key.justificacion2:
                        permisos_list.append({
                            "id": id_key.id,
                            "materia": materia_list,
                            "justificacion": id_key.justificacion,
                            "descripcion": id_key.descripcion,
                            "comentario": id_key.comentario,
                            "justificacion2": id_key.justificacion2,
                            "fechaSolicitud": id_key.fechaSolicitud,
                            "estado": id_key.estado,
                            "motivo": id_key.motivo,
                            "estudiante": estudiante_name,
                        })
                    else:
                        permisos_list.append({
                            "id": id_key.id,
                            "materia": materia_list,
                            "justificacion": id_key.justificacion,
                            "descripcion": id_key.descripcion,
                            "comentario": id_key.comentario,
                            "fechaSolicitud": id_key.fechaSolicitud,
                            "estado": id_key.estado,
                            "motivo": id_key.motivo,
                            "estudiante": estudiante_name,
                        })
                    existing_ids.append(id_key.id_solicitud)
        serializer = PermisoSerializer(data=permisos_list, many=True)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        id_solicitud = permisos.objects.get(id=pk).id_solicitud
        permisos.objects.filter(id_solicitud=id_solicitud).update(
            estado=request.data.get('estado'))
        if request.data.get('observacion') != None:
            permisos.objects.filter(id_solicitud=id_solicitud).update(
                observaciones=request.data.get('observacion'))
        else:
            permisos.objects.filter(id_solicitud=id_solicitud).update(
                observaciones="Sin observaciones")
        return Response(status=status.HTTP_202_ACCEPTED)
