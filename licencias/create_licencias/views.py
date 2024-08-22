from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from licencias.models import permisos
from gestion.models import estudiante
from licencias.serializer import LicenciasSerializer
from gestion.serializer import PermisoSerializer


class licenciasViewSet(viewsets.ViewSet):
    queryset = permisos.objects.all()
    serializer_class = LicenciasSerializer

    def list(self, request):
        queryset = permisos.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        id_estudiante = estudiante.objects.get(ci=pk)
        queryset = permisos.objects.filter(project_id=id_estudiante)
        serializer = self.serializer_class(queryset, many=True)
        permisos_list = []
        existing_ids = []
        for id_key in queryset:
            if id_key.id_solicitud not in existing_ids:
                permiso_group = permisos.objects.filter(
                    id_solicitud=id_key.id_solicitud)
                materia_list = []
                for permiso in permiso_group:
                    materia_list.append(
                        {"materia": permiso.materia, "fecha": permiso.fecha})
                if id_key.justificacion2 == "" and id_key.comentario == ' ':
                    apelacion = 0
                else:
                    apelacion = 1
                permisos_list.append({
                    "id": id_key.id,
                    "materia": materia_list,
                    "justificacion": id_key.justificacion,
                    "descripcion": id_key.descripcion,
                    "fechaSolicitud": id_key.fechaSolicitud,
                    "estado": id_key.estado,
                    "observaciones": id_key.observaciones,
                    "apelacion": apelacion
                })
                existing_ids.append(id_key.id_solicitud)
        serializer = PermisoSerializer(
            data=permisos_list, many=True)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        carnet = request.data['ci']
        if permisos.objects.last() == None:
            nuevo_id = 0
        else:
            nuevo_id = permisos.objects.last().id + 1
        for key, value in request.data.items():
            if key.startswith('materia') and key.endswith('[materia]'):
                indice = key.split('[')[1].split(']')[0]
                permisos.objects.create(
                    materia=request.data.get(f'materia[{indice}][materia]'),
                    fecha=request.data.get(f'materia[{indice}][fecha]'),
                    justificacion=request.FILES['justificacion[]'],
                    descripcion=request.data['descripcion'],
                    project=estudiante.objects.get(ci=carnet),
                    motivo=request.data['motivo'],
                    id_solicitud=nuevo_id
                )
        return Response({'message': 'Licencia creada'}, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        try:
            permiso_instances = permisos.objects.filter(id_solicitud=pk)
            if not permiso_instances.exists():
                return Response({'message': 'Permiso no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            for permiso_instance in permiso_instances:
                permiso_instance.estado = "Pendiente"

                if 'comentario' in request.data:
                    permiso_instance.comentario = request.data.get(
                        'comentario')

                if 'justificacion2[]' in request.FILES:
                    permiso_instance.comentario = " "
                    permiso_instance.justificacion2 = request.FILES['justificacion2[]']

                permiso_instance.save()

            return Response({'message': 'Licencias actualizadas'}, status=status.HTTP_202_ACCEPTED)

        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
