from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth.views import LogoutView

app_name = 'Accounts'

urlpatterns = [
    path('student/create/',StudentListCreate.as_view(),name='student-list-create'),
    path('login/',obtain_auth_token,name='login'),
    path('get-user/',TokenToUser.as_view(),name='get-user'),

    path('student-from-token/',StudentFromToken.as_view(),name='student-from-token'),
    path('student-from-username/',StudentFromUsername.as_view(),name='student-from-username'),

    # web urls
    path('web-login/',WebLoginView.as_view(),name='web-login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('student-register/',StudentRegisterView.as_view(),name='student-register'),

    path('profile/',ProfileView.as_view(),name='profile'),
]