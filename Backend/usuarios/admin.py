from django.contrib import admin
from .models import Usuario
# Register your models here.
from .forms import CustomUserChangeForm, CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin




@admin.register(Usuario)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model= Usuario

    list_display = ('correo', 'username', 'nombreCompleto', 'estado', 'is_staff', 'fechaCreacion', 'ultimoAcesso')
    list_filter = ('estado', 'is_staff', 'is_superuser')

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('correo', 'username', 'nombreCompleto', 'password1', 'password2', 'estado', 'is_staff', 'is_active')}
        ),
    )

    search_fields = ('correo', 'nombreCompleto')
    ordering = ('fechaCreacion',)