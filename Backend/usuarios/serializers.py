from .models import Usuario
from django.contrib.auth import authenticate
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id","nombreCompleto","correo","estado","fechaCreacion","ultimoAcesso"]

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password1= serializers.CharField(write_only=True)
    password2= serializers.CharField(write_only=True)
    class Meta:


        model = Usuario
        fields = ["id","nombreCompleto","correo","password1","password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        password = attrs.get("password1", "")
        if len(password) <8 :
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres")
        return attrs
    

    def create(self,validated_data):
        correo =validated_data.get('correo')
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return Usuario.objects.create_user(username=correo, password=password, **validated_data)
    


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