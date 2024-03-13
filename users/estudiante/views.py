from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from gestion.models import estudiante
from gestion.serializer import GestionSerializer
import pandas as pd
import openpyxl
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


class StudentDataView(viewsets.ReadOnlyModelViewSet):
    queryset = estudiante.objects.all()
    serializer_class = GestionSerializer
    permission_classes = [AllowAny]  # Permite cualquier acceso

    def retrieve(self, request, *args, **kwargs):
        ci_user = kwargs.get('pk')
        id_estudiante = estudiante.objects.filter(ci=ci_user)
        if not id_estudiante:
            return Response({"detail": "No se encontro el estudiante"}, status=404)
        serializer = self.get_serializer(id_estudiante, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def create_students(self, request):
        archivo = request.FILES.get('archivo[]')
        self.guardar_archivo(archivo)
        response = {'message': 'Created successfully'}
        return Response(response, status=201)

    def encontrar_valor(self, archivo_excel, valor_a_buscar):
        wb = openpyxl.load_workbook(archivo_excel)
        hoja_activa = wb.active

        for fila_idx, fila in enumerate(hoja_activa.iter_rows(), start=1):
            for columna_idx, celda in enumerate(fila, start=1):
                if celda.value == valor_a_buscar:
                    return fila_idx, columna_idx
        return None, None

    def guardar_archivo(self, archivo):
        archivo_temporal = default_storage.save(
            'temp_archivo.xlsx', ContentFile(archivo.read()))
        path = default_storage.path(archivo_temporal)
        valor_a_buscar = 'Nombre'

        fila_encontrada, _ = self.encontrar_valor(
            'media/'+archivo_temporal, valor_a_buscar)
        df = pd.read_excel(
            path, names=['Carnet', 'Nombre', 'Apellido'], index_col=None)
        df = df.iloc[fila_encontrada - 1:]
        df = df.reset_index(drop=True)
        for i in range(len(df.axes[0])):
            print(df.iloc[i]['Nombre'])
            print(df.iloc[i]['Apellido'])
            if estudiante.objects.filter(ci=df.iloc[i]['Carnet']).exists() == False:
                estudiante.objects.create(
                    nombre=df.iloc[i]['Nombre'],
                    apellido=df.iloc[i]['Apellido'],
                    ci=df.iloc[i]['Carnet'],
                )
        default_storage.delete(path)
