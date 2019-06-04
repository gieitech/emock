from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'Accounts'

urlpatterns = [
    path('student/create/',StudentListCreate.as_view(),name='student-list-create'),
    path('login/',obtain_auth_token,name='login'),
    path('get-user/',TokenToUser.as_view(),name='get-user'),

    path('student-from-token/',StudentFromToken.as_view(),name='student-from-token'),
]