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

    def post(self,request):
        print(self.kwargs.get('quiz_id'))
        return Response({'response':'response'})