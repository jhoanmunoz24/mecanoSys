from django.urls import path,include

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import routers
from usuarios import views
from .views import *




router = routers.DefaultRouter()
router.register(r'usuarios', views.UserView, 'usuarios')
urlpatterns = [
    path("register/", UserRegistrationAPI.as_view(), name= "register-user"),
    path("login/", UserLoginAPIView.as_view(), name= "login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name= "logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name= "token-refresh"),
    path("user/", UserInfoAPIView.as_view(), name="user-info"),
    path("", include(router.urls))

]