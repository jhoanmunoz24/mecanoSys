from django.shortcuts import render
from rest_framework import viewsets
from .models import Repuesto
from .serializers import RepuestoSerializer
# Create your views here.
class RepuestoView(viewsets.ModelViewSet):
    serializer_class = RepuestoSerializer
    queryset = Repuesto.objects.all()