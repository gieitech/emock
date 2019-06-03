from rest_framework.generics import (
    
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *


# Create your views here.
class QuizListCreate(ListCreateAPIView):

    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuizEditDelete(RetrieveUpdateDestroyAPIView):

    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()



class QuestionListCreate(ListCreateAPIView):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        return self.queryset.filter(quiz_id=self.kwargs.get('quiz_id'))
    

class GenerateReport(APIView):


    def get(self, request ,quiz_id):
        quiz = Quiz.objects.get(pk=quiz_id)
        serializer = QuizSerializer(quiz)
        return Response({"quiz" : serializer.data})


    def post(self,request,quiz_id):
        
        print(request)
        return Response({'response':str(request.data)})