from .models import Usuario
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Usuario, Rol, Permiso, UsuarioRol, RolPermiso
from .models import Rol, UsuarioRol

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombre', 'descripcion', 'fecha_creacion']

class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = ['id', 'clave', 'descripcion']

class UsuarioRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioRol
        fields = ['usuario', 'rol', 'fecha_asignacion', 'asignado_por']
        read_only_fields = ['fecha_asignacion']

class RolPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolPermiso
        fields = ['rol', 'permiso', 'fecha_asignacion']
        read_only_fields = ['fecha_asignacion']

class CustomUserSerializer(serializers.ModelSerializer):
    roles = RolSerializer(many=True, read_only=True)
    class Meta:
        model = Usuario
        fields = ["id","nombreCompleto","correo","estado","fechaCreacion","ultimoAcesso","roles"]


class UsuarioWriteSerializer(serializers.ModelSerializer):
    rolIds = serializers.ListField(child=serializers.UUIDField(), required=False, write_only=True)
    password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = Usuario
        fields = ["nombreCompleto","correo","estado","rolIds","password"]

    def create(self, validated_data):
        rol_ids = validated_data.pop("rolIds", [])
        password = validated_data.pop("password", None)
        user = Usuario.objects.create_user(
            username=validated_data.get("correo"),
            password=password or Usuario.objects.make_random_password(),
            **validated_data
        )
        if rol_ids:
            roles = Rol.objects.filter(id__in=rol_ids)
            user.roles.set(roles)
        else:
            admin, _ = Rol.objects.get_or_create(nombre="Admin", defaults={"descripcion":"Admin por defecto"})
            user.roles.add(admin)
        return user
    
    def update(self, instance, validated):
        rol_ids = validated.pop("rolIds", None)
        pwd = validated.pop("password", None)

        for attr, val in validated.items():
            setattr(instance, attr, val)

        if pwd:
            instance.set_password(pwd)

        instance.save()
        if rol_ids is not None:
            roles = Rol.objects.filter(id__in=rol_ids)
            instance.roles.set(roles)
            if roles.filter(nombre__iexact="admin").exists():
                instance.is_staff = True
                instance.is_superuser = True
                instance.save(update_fields=["is_staff","is_superuser"])

        return instance

    

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password1= serializers.CharField(write_only=True)
    password2= serializers.CharField(write_only=True)
    rol = serializers.PrimaryKeyRelatedField(
        queryset=Rol.objects.all(), required=False, write_only=True
    )
    class Meta:


        model = Usuario
        fields = ["id","nombreCompleto","correo","rol","password1","password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        password = attrs.get("password1", "")
        if len(password) <8 :
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres")
        return attrs
    

    def create(self,validated_data):
        
        rol_id = validated_data.pop("rol", None)
        correo =validated_data.get('correo')
        password = validated_data.pop("password1")
        validated_data.pop("password2")


        user = Usuario.objects.create_user(username=correo, password=password, **validated_data)
    
        
        if rol_id:
            rol = Rol.objects.get(id=rol_id)
        else:
            rol, _ = Rol.objects.get_or_create(nombre="Admin", defaults={"descripcion": "Rol por defecto Admin"})
        UsuarioRol.objects.get_or_create(usuario=user, rol=rol)

        return user
        


class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField()
    password = serializers.CharField(write_only =True)

    def validate(self, data):
        correo = data.get('correo')
        password = data.get('password')


        user = authenticate(
            request= self.context.get('request'),
            username=correo,
            password=password
        )
        if user is None:
            raise serializers.ValidationError(
                "El usuario o la contraseña son incorrectos"
            )
        
        if not user.is_active:
            raise serializers.ValidationError(
                "Esta cuenta está desactivada"
            )
        
        return user