from rest_framework import serializers
from rest_framework.fields import FileField
from .models import estudiante, puntos, actividades


class GestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = estudiante
        fields = '__all__'


class PuntosSerializer(serializers.ModelSerializer):
    class Meta:
        model = puntos
        fields = '__all__'


class ActividadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = actividades
        fields = '__all__'


class PermisoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    materia = serializers.ListField(child=serializers.DictField())
    justificacion = FileField()
    descripcion = serializers.CharField()
    fechaSolicitud = serializers.DateField()
    estado = serializers.CharField()
    motivo = serializers.CharField()
    estudiante = serializers.CharField()
