from rest_framework import serializers
from django.core.files.base import ContentFile
from .models import estudiante, puntos, actividades
from licencias.models import materias, permisos


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
    justificacion = serializers.FileField()
    descripcion = serializers.CharField()
    comentario = serializers.CharField(required=False, allow_blank=True)
    justificacion2 = serializers.FileField(required=False)
    fechaSolicitud = serializers.DateField()
    estado = serializers.CharField()
    motivo = serializers.CharField(required=False)
    estudiante = serializers.CharField(required=False)
    observaciones = serializers.CharField(required=False)
    apelacion = serializers.IntegerField(required=False)
