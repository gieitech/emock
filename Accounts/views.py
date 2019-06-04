from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    
)
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class StudentListCreate(ListCreateAPIView):

    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TokenToUser(APIView):

    def post(self , request):
        info = request.data
        
        token = Token.objects.get(key=info['token'])
        student = Student.objects.get(user_id = token.user)
        serializer = StudentSerializer(student)
        return Response(serializer.data , status=status.HTTP_200_OK)

        
class StudentFromToken(APIView):

    def post(self , request):
        token_rcv = request.data['token']
        token = Token.objects.get(key=token_rcv)
        user = User.objects.get(pk=token.user_id)
        student = Student.objects.get(user=user)
        serializer = StudentSerializer(student)

        return Response(serializer.data , status = status.HTTP_200_OK)