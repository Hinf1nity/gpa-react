from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from gestion.models import estudiante, puntos, actividades
from gestion.serializer import GestionSerializer
import pandas as pd
import openpyxl
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


class GestionView(viewsets.ViewSet):
    queryset = actividades.objects.all()
    serializer_class = GestionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # print(request.data)
        self.puntos_totales = abs(int(request.data.get('puntos_gpa')))
        actividades.objects.create(
            actividades=request.data.get('actividad'),
            fecha=request.data.get('fecha'),
            puntos_ac=self.puntos_totales,
            estado=request.data.get('estado')
        )
        if request.data.get('estado') == 'Finalizada':
            actividad = request.data.get('actividad')
            fecha = request.data.get('fecha')
            if request.FILES.get('archivo[]') == None:
                carnets_puntos = []
                self.carnets_not_found = []
                for key in request.data.keys():
                    if carnets_puntos != []:
                        try:
                            puntos_estudiante = abs(int(request.data.get(key)))
                            if puntos_estudiante > self.puntos_totales:
                                puntos_estudiante = self.puntos_totales
                            puntos.objects.create(
                                actividad=actividad,
                                fecha=fecha,
                                puntos_gpa=puntos_estudiante,
                                estudiante=estudiante.objects.get(
                                    ci=carnets_puntos[0])
                            )
                        except:
                            self.carnets_not_found.append(carnets_puntos[0])
                        carnets_puntos = []
                    elif 'carnets' in key:
                        # print(request.data.get(key))
                        carnets_puntos.append(request.data.get(key))
            else:
                archivo = request.FILES.get('archivo[]')
                self.guardar_archivo(archivo, actividad, fecha)
            if self.carnets_not_found != []:
                response = {'message': 'Carnets not found',
                            'carnets': self.carnets_not_found}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        response = {'message': 'Created successfully'}
        return Response(response, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        # print(request.data)
        actividades.objects.filter(
            actividades=request.data.get('actividad')).update(estado=request.data.get('estado'))
        if request.data.get('estado') == 'Finalizada':
            actividad = request.data.get('actividad')
            fecha = actividades.objects.get(actividades=actividad).fecha
            self.carnets_not_found = []
            if request.FILES.get('archivo[]') == None:
                carnets_puntos = []
                for key in request.data.keys():
                    if carnets_puntos != []:
                        try:
                            puntos_estudiante = abs(int(request.data.get(key)))
                            if puntos_estudiante > self.puntos_totales:
                                puntos_estudiante = self.puntos_totales
                            puntos.objects.create(
                                actividad=actividad,
                                fecha=fecha,
                                puntos_gpa=puntos_estudiante,
                                estudiante=estudiante.objects.get(
                                    ci=carnets_puntos[0])
                            )
                        except:
                            self.carnets_not_found.append(carnets_puntos[0])
                        carnets_puntos = []
                    elif 'carnets' in key:
                        # print(request.data.get(key))
                        carnets_puntos.append(request.data.get(key))
            else:
                archivo = request.FILES.get('archivo[]')
                self.guardar_archivo(archivo, actividad, fecha)
            if self.carnets_not_found != []:
                response = {'message': 'Carnets not found',
                            'carnets': self.carnets_not_found}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        response = {'message': 'Updated successfully'}
        return Response(response, status=status.HTTP_200_OK)

    def encontrar_valor(self, archivo_excel, valor_a_buscar):
        wb = openpyxl.load_workbook(archivo_excel)
        hoja_activa = wb.active

        for fila_idx, fila in enumerate(hoja_activa.iter_rows(), start=1):
            for columna_idx, celda in enumerate(fila, start=1):
                if celda.value == valor_a_buscar:
                    return fila_idx, columna_idx
        return None, None

    def guardar_archivo(self, archivo, actividad, fecha):
        archivo_temporal = default_storage.save(
            'temp_archivo.xlsx', ContentFile(archivo.read()))
        path = default_storage.path(archivo_temporal)
        valor_a_buscar = 'PUNTOS'

        fila_encontrada, _ = self.encontrar_valor(
            'media/'+archivo_temporal, valor_a_buscar)
        df = pd.read_excel(
            path, names=['CI', 'PUNTOS'], index_col=None)
        df = df.iloc[fila_encontrada - 1:]
        df = df.reset_index(drop=True)
        self.carnets_not_found = []
        for i in range(len(df.axes[0])):
            # print(df.iloc[i]['CI'])
            # print(df.iloc[i]['PUNTOS'])
            try:
                puntos_estudiante = abs(int(df.iloc[i]['PUNTOS']))
                if puntos_estudiante > self.puntos_totales:
                    puntos_estudiante = self.puntos_totales
                puntos.objects.create(
                    actividad=actividad,
                    fecha=fecha,
                    puntos_gpa=puntos_estudiante,
                    estudiante=estudiante.objects.get(
                        ci=df.iloc[i]['CI'])
                )
            except:
                self.carnets_not_found.append(df.iloc[i]['CI'])
        default_storage.delete(path)
