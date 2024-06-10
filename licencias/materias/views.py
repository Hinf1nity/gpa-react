from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from licencias.models import materias
from licencias.serializer import MateriasSerializer


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
