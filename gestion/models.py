from django.db import models

# Create your models here.


class estudiante(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50, default="")
    estado = models.BooleanField(default=True)
    ci = models.IntegerField(unique=True, null=True, blank=True)

    def __str__(self):
        return self.nombre + " " + self.apellido


class puntos(models.Model):
    estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE)
    fecha = models.DateField()
    actividad = models.CharField(max_length=50)
    puntos_gpa = models.IntegerField(default=0)

    def __str__(self):
        return self.actividad


class actividades(models.Model):
    STATUS_CHOICES = (
        ('en proceso', 'En proceso'),
        ('Finalizado', 'Finalizado'),
        ('proximamente', 'Proximamente'),
    )
    actividades = models.CharField(max_length=100)
    fecha = models.DateField()
    puntos_ac = models.IntegerField()
    estado = models.CharField(
        max_length=12, choices=STATUS_CHOICES, default='Proximamente')

    def __str__(self):
        return self.actividades
