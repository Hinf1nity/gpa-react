from rest_framework import serializers


class PermisoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    materia = serializers.ListField(child=serializers.DictField())
    fechaSolicitud = serializers.DateField()
    estudiante = serializers.CharField()
