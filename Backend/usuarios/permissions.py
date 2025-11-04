from rest_framework.permissions import BasePermission

class TienePermiso(BasePermission):
    required = None  # p.ej., 'usuarios.gestion'

    def has_permission(self, request, view):
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            return False
        if getattr(user, 'is_superuser', False):
            return True
        if not self.required:
            return True
        return user.roles.filter(
            permisos_asignados__permiso__clave=self.required
        ).exists()