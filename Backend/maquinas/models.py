from django.db import models
import uuid

# Create your models here.
from usuarios.models import Usuario




class Cliente(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=100)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nombre

class Maquina(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    modelo = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre

class Reparacion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    idMaquina = models.ForeignKey(Maquina, on_delete=models.CASCADE)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fechaIngreso = models.DateTimeField(auto_now_add=True)
    estadoReparacion = models.CharField(max_length=100)
    descripcionProblema = models.CharField(max_length=100)
    observacionesMecanico = models.CharField(max_length=100)

    def __str__(self):
        return self.idMaquina
    class Meta:
        verbose_name = "Reparacion"
        verbose_name_plural = "Reparaciones"






class EstadoRepuesto(models.TextChoices):
    DISPONIBLE = 'disponible', 'Disponible'
    SIN_STOCK = 'sin stock', 'Sin Stock'



class Repuesto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    nombre= models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    stock = models.PositiveIntegerField()
    precioUnitario = models.DecimalField(max_digits=10, decimal_places=2)
    precioVenta = models.DecimalField(max_digits=10, decimal_places=2)
    fechaIngreso = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=100, choices=EstadoRepuesto.choices, default=EstadoRepuesto.DISPONIBLE)


    def __str__(self):
        return self.nombre

class RepuestoReparacion(models.Model):
    repuesto = models.ForeignKey(Repuesto, on_delete=models.CASCADE)
    reparacion = models.ForeignKey(Reparacion, on_delete=models.CASCADE)

    cantidad_usada = models.PositiveIntegerField()
    precio_unitario_al_momento = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Repuesto de reparación"
        verbose_name_plural = "Repuestos de reparación"
        unique_together = ('repuesto', 'reparacion')
        db_table = "Repuestos_Reparaciones"

