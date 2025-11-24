from django.urls import path,include

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import routers




from .views import *
from maquinas.views import RepuestoView


router = routers.DefaultRouter()
router.register(r'usuarios', UserView, 'usuarios')
router.register(r'roles', RolViewSet, basename='roles')
router.register(r'permisos', PermisoViewSet, basename='permisos')
router.register(r'repuestos', RepuestoView, 'repuestos')


urlpatterns = [
    path("register/", UserRegistrationAPI.as_view(), name= "register-user"),
    path("login/", UserLoginAPIView.as_view(), name= "login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name= "logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name= "token-refresh"),
    path("user/", UserInfoAPIView.as_view(), name="user-info"),
    
    path("", include(router.urls)),

    


]