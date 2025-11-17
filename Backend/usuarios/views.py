from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from .serializers import *
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import viewsets
from .models import Usuario

from .models import Usuario, Rol, Permiso, UsuarioRol, RolPermiso
from .serializers import CustomUserSerializer, RolSerializer, PermisoSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from usuarios.permissions import TienePermiso

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

    @action(detail=True, methods=['post'])
    def asignar_permiso(self, request, pk=None):
        permiso_id = request.data.get('permiso')
        RolPermiso.objects.get_or_create(rol_id=pk, permiso_id=permiso_id)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['delete'])
    def retirar_permiso(self, request, pk=None):
        permiso_id = request.data.get('permiso')
        RolPermiso.objects.filter(rol_id=pk, permiso_id=permiso_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PermisoViewSet(viewsets.ModelViewSet):
    queryset = Permiso.objects.all()
    serializer_class = PermisoSerializer



class UserView(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()
    
    def get_serializer_class(self):
        return UsuarioWriteSerializer if self.action in ["create","update","partial_update"] else CustomUserSerializer

    def perform_update(self, serializer):
        user = serializer.save()

    def get_serializer_class(self):
        return UsuarioWriteSerializer if self.action in ['create','update','partial_update'] else CustomUserSerializer
    
    def get_permissions(self):
        # Listar o ver usuarios: solo autenticado
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        
        
        # Crear, editar oeliminar: necesita permiso específico
        permiso = TienePermiso()
        permiso.required = 'usuarios.gestion'
        return [IsAuthenticated(), permiso]
    
    TienePermiso.required = 'usuarios.gestion'

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, TienePermiso])
    def asignar_rol(self, request, pk=None):
        usuario = self.get_object()
        rol_id = request.data.get('rol')
        asignado_por = request.data.get('asignado_por')
        UsuarioRol.objects.get_or_create(usuario=usuario, rol_id=rol_id, defaults={'asignado_por': asignado_por})

       
        rol = Rol.objects.get(id=rol_id)
        if rol.nombre.lower() in ('admin','administrador'):
            usuario.is_staff = True
            usuario.is_superuser = True
            usuario.save(update_fields=['is_staff','is_superuser'])
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def get_serializer_class(self):
        if self.action in ["create","update","partial_update"]:
            return UsuarioWriteSerializer
        return CustomUserSerializer

    

    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated, TienePermiso])
    def retirar_rol(self, request, pk=None):
        usuario = self.get_object()
        rol_id = request.data.get('rol')
        UsuarioRol.objects.filter(usuario=usuario, rol_id=rol_id).delete()

        
        if not usuario.roles.filter(nombre__iexact='admin').exists():
            if usuario.is_superuser or usuario.is_staff:
                usuario.is_superuser = False
                usuario.is_staff = False
                usuario.save(update_fields=['is_superuser','is_staff'])
        return Response(status=status.HTTP_204_NO_CONTENT)





class UserRegistrationAPI(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CustomUserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Crear (si no existen) el rol y el permiso
        rol_admin, _ = Rol.objects.get_or_create(
            nombre="Admin",
            defaults={"descripcion": "Rol con acceso total al sistema"}
        )

        permiso_gestion, _ = Permiso.objects.get_or_create(
            clave="usuarios.gestion",
            defaults={"descripcion": "Permite gestionar usuarios"}
        )

        # Asociar el permiso al rol
        RolPermiso.objects.get_or_create(
            rol=rol_admin,
            permiso=permiso_gestion
        )

        # Asignar el rol al usuario
        UsuarioRol.objects.get_or_create(
            usuario=user,
            rol=rol_admin
        )

        # Marcarlo como admin en Django
        user.is_staff = True
        user.is_superuser = True
        user.save(update_fields=["is_staff", "is_superuser"])

        # Generar tokens
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token)
        }

        return Response(data, status=status.HTTP_201_CREATED)


class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data


        user.ultimoAcesso = timezone.now()
        user.save(update_fields=['ultimoAcesso'])

        data["tokens"] = {"refresh": str(token),"access": str(token.access_token)}
        return Response(data, status = status.HTTP_200_OK)
    

class UserLogoutAPIView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self,request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user