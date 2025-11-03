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

    # rol = models.ForeignKey('Rol', on_delete=models.SET_NULL, null=True, blank=True)

    USERNAME_FIELD = "correo"
    REQUIRED_FIELDS = ['username']

    def __str__(self) -> str:
        return self.correo