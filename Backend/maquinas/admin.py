from django.contrib import admin
from .models import Maquina,Cliente,Repuesto,Reparacion,RepuestoReparacion,EstadoRepuesto
# Register your models here.


admin.site.register([
    Maquina,
    Cliente,
    Repuesto,
    Reparacion,
    RepuestoReparacion,
    
])