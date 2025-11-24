
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()

router.register(r'repuestos', views.RepuestoView, 'repuestos')

urlpatterns= [
    path("",include(router.urls)),
]