from rest_framework.permissions import BasePermission

class TienePermiso(BasePermission):
    required_permission = None
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if not self.required_permission:
            return True
        return request.user.usuario.roles.filter(
            rol_permisos__permiso__clave=self.required_permission
        ).exists()