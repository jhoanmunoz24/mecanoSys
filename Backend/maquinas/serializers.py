from rest_framework import serializers
from models import Maquina


class MaquinaSerializer(serializers.ModelSerializer):
    class meta:
        model = Maquina
        fields = ('id','modelo','nombre','marca','cliente')
        