from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from gestion.models import estudiante
from gestion.serializer import GestionSerializer
from django.contrib.auth import authenticate


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
        # print(token.key)
        return Response({'token': token.key})
