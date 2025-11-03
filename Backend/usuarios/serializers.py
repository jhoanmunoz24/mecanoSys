from .models import Usuario
from django.contrib.auth import authenticate
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id","correo"]

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password1= serializers.CharField(write_only=True)
    password2= serializers.CharField(write_only=True)
    class Meta:


        model = Usuario
        fields = ["id","correo","password1","password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        password = attrs.get("password1", "")
        if len(password) <8 :
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres")
        return attrs
    

    def create(self,validated_data):

        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return Usuario.objects.create_user(password=password, **validated_data)
    


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only =True)

    def validate(self, data):
        user = authenticate(**data)

        if user is user.is_active:
            return user
        raise serializers.ValidationError("El usuario o la contraseña son incorrectos")