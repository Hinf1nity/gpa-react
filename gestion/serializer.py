from rest_framework import serializers
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
