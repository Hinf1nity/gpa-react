from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from gestion.models import estudiante
from gestion.serializer import GestionSerializer
import pandas as pd
import openpyxl
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


class EstudiantesView(viewsets.ViewSet):
    queryset = estudiante.objects.all()
    serializer_class = GestionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # print(request.data)
        if request.FILES.get('archivo[]') != None:
            archivo = request.FILES.get('archivo[]')
            self.guardar_archivo(archivo)
            response = {'message': 'Created successfully'}
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Archivo no encontrado'}, status=status.HTTP_400_BAD_REQUEST)

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
        valor_a_buscar = 'ESTUDIANTE'

        fila_encontrada, _ = self.encontrar_valor(
            'media/'+archivo_temporal, valor_a_buscar)
        df = pd.read_excel(
            path, names=['CI', 'ESTUDIANTE'], index_col=None)
        df = df.iloc[fila_encontrada - 1:]
        df = df.reset_index(drop=True)
        for i in range(len(df.axes[0])):
            # print(df.iloc[i]['ESTUDIANTE'])
            # print(df.iloc[i]['CI'])
            if estudiante.objects.filter(ci=df.iloc[i]['CI']).exists() == False:
                estudiante.objects.create(
                    nombre=df.iloc[i]['ESTUDIANTE'],
                    ci=df.iloc[i]['CI'],
                )
        default_storage.delete(path)
