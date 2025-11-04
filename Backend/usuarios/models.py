from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class EstadoUsuario(models.TextChoices):
    ACTIVO = 'activo', 'Activo'
    INACTIVO = 'inactivo', 'Inactivo'
    
# Create your models here.
class Usuario(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombreCompleto = models.CharField(max_length=200)   
    correo = models.EmailField(unique=True) 
    estado = models.CharField(max_length=10, choices=EstadoUsuario.choices, default=EstadoUsuario.ACTIVO)

    fechaCreacion = models.DateTimeField(auto_now_add=True)
    ultimoAcesso = models.DateTimeField(auto_now=True)


    roles = models.ManyToManyField('Rol', through='UsuarioRol', related_name='usuarios')

    # rol = models.ForeignKey('Rol', on_delete=models.SET_NULL, null=True, blank=True)

    USERNAME_FIELD = "correo"
    REQUIRED_FIELDS = ['username']

    def __str__(self) -> str:
        return self.correo

class Rol(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

class Permiso(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    clave = models.CharField(max_length=150, unique=True)
    descripcion = models.TextField(blank=True)


class UsuarioRol(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    asignado_por = models.UUIDField(null=True, blank=True)

    class Meta:
        unique_together = (('usuario', 'rol'),)
        indexes = [models.Index(fields=['usuario', 'rol'])]
        
class RolPermiso(models.Model):
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)
    fecha_asignacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('rol', 'permiso'),)