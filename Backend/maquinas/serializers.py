from rest_framework import serializers
from .models import Maquina, Repuesto


class MaquinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maquina
        fields = ('id','modelo','nombre','marca','cliente')
        



class RepuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repuesto

        # fields = ('id','nombre','descripcion','categoria','marca','modelo','stock','precioUnitario','precioVenta','fechaIngreso','estado')

        fields = '__all__'