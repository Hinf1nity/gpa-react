from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import estudiante, puntos, actividades
from .serializer import GestionSerializer, PuntosSerializer, ActividadesSerializer
import pandas as pd
import openpyxl
from django.contrib.auth import authenticate
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


class UserAuth(viewsets.ViewSet):
    queryset = estudiante.objects.all()
    serializer_class = GestionSerializer

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username == "" or password == "":
            return Response({'error': 'Por favor, proporciona ambos nombre de usuario y contraseña'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if not user:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)
        print(token.key)
        return Response({'token': token.key})


class GestionView(viewsets.ViewSet):
    queryset = actividades.objects.all()
    serializer_class = GestionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        print(request.data)
        actividades.objects.create(
            actividades=request.data.get('actividad'),
            fecha=request.data.get('fecha'),
            puntos_ac=request.data.get('puntos_gpa'),
            estado=request.data.get('estado')
        )
        if request.data.get('estado') == 'Finalizada':
            actividad = request.data.get('actividad')
            fecha = request.data.get('fecha')
            if request.FILES.get('archivo[]') == None:
                carnets_puntos = []
                for key in request.data.keys():
                    if carnets_puntos != []:
                        puntos.objects.create(
                            actividad=actividad,
                            fecha=fecha,
                            puntos_gpa=request.data.get(key),
                            estudiante=estudiante.objects.get(
                                ci=carnets_puntos[0])
                        )
                        carnets_puntos = []
                    elif 'carnets' in key:
                        print(request.data.get(key))
                        carnets_puntos.append(request.data.get(key))
            else:
                archivo = request.FILES.get('archivo[]')
                self.guardar_archivo(archivo, actividad, fecha)
        response = {'message': 'Created successfully'}
        return Response(response, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        print(request.data)
        actividades.objects.filter(
            actividades=request.data.get('actividad')).update(estado=request.data.get('estado'))
        if request.data.get('estado') == 'Finalizada':
            actividad = request.data.get('actividad')
            fecha = actividades.objects.get(actividades=actividad).fecha
            if request.FILES.get('archivo[]') == None:
                carnets_puntos = []
                for key in request.data.keys():
                    if carnets_puntos != []:
                        puntos.objects.create(
                            actividad=actividad,
                            fecha=fecha,
                            puntos_gpa=request.data.get(key),
                            estudiante=estudiante.objects.get(
                                ci=carnets_puntos[0])
                        )
                        carnets_puntos = []
                    elif 'carnets' in key:
                        print(request.data.get(key))
                        carnets_puntos.append(request.data.get(key))
            else:
                archivo = request.FILES.get('archivo[]')
                self.guardar_archivo(archivo, actividad, fecha)
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
        valor_a_buscar = 'Nombre'

        fila_encontrada, _ = self.encontrar_valor(
            'media/'+archivo_temporal, valor_a_buscar)
        df = pd.read_excel(
            path, names=['Carnet', 'Nombre', 'Apellido', 'Puntos'], index_col=None)
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
            puntos.objects.create(
                actividad=actividad,
                fecha=fecha,
                puntos_gpa=df.iloc[i]['Puntos'],
                estudiante=estudiante.objects.get(
                    ci=df.iloc[i]['Carnet'])
            )
        default_storage.delete(path)
