from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import materias, permisos
from gestion.models import estudiante
from .serializer import MateriasSerializer, LicenciasSerializer

# Create your views here.


class MateriasViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = materias.objects.all()
    serializer_class = MateriasSerializer

    def list(self, request, *args, **kwargs):
        materias_list = materias.objects.all()
        materias_paralelo_list = []
        for materia in materias_list:
            found = False
            for item in materias_paralelo_list:
                if item['materia'] == materia.materia:
                    found = True
                    break
            if not found:
                paralelos = materias.objects.filter(
                    materia=materia.materia).count()
                materias_paralelo_list.append(
                    {"id": materia.id, "materia": materia.materia, "paralelo": paralelos})
        serializer = self.get_serializer(materias_paralelo_list, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'No se pudo crear la materia'
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        materia = materias.objects.get(id=pk)
        serializer = self.serializer_class(materia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response({
            'status': 'Bad request',
            'message': 'No se pudo actualizar la materia'
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        materia = materias.objects.get(id=pk)
        materia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class licenciasViewSet(viewsets.ViewSet):
    queryset = permisos.objects.all()
    serializer_class = LicenciasSerializer

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
