from rest_framework import serializers
from .models import materias, permisos


class MateriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = materias
        fields = ('id', 'materia', 'paralelo')


class LicenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = permisos
        fields = "__all__"
