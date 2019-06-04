from rest_framework.generics import (
    
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework import status
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


    def post(self,request,quiz_id , student_id):
        
        
        answered = len(request.data)
        correct = 0
        marks_gained = 0
        quiz = Quiz.objects.get(pk=quiz_id)
 
        student = Student.objects.get(pk=student_id)

        for i in request.data:
            question = Question.objects.get(pk=i['question'])
            if not question.isMultipleCorrect:
                option_input = Option.objects.get(pk=i['option'])
                option_saved = question.correctAnswer()
                if option_input == option_saved:
                    correct += 1
                    marks_gained += question.marks
            else:
                pass

        
        report = Report.objects.create(
            student=student,
            quiz=quiz,
            answered=answered,
            gained_marks=marks_gained,
        )
        serializer = ReportSerializer(report)
        return Response({'data':serializer.data},status=status.HTTP_201_CREATED)