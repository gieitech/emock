from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from Accounts.serializers import StudentSerializer
from django.views.generic import (
    TemplateView,
    ListView,
    DetailView,
)
from Website.models import Brand
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from django.shortcuts import render  
from django.http import HttpResponse  
# Create your views here.
class QuizListCreate(ListCreateAPIView):

    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuizEditDelete(RetrieveUpdateDestroyAPIView):

    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

class QuizDetailsAPIView(RetrieveAPIView):

    serializer_class = QuizDetailsSerializer
    queryset = Quiz.objects.all()

class QuizCreateAPIView(CreateAPIView):
    serializer_class = QuizCreateSerializer
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
                option_input = Option.objects.get(pk=i['options'][0])
                option_saved = question.correctAnswer()
                if option_input == option_saved:
                    correct += 1
                    marks_gained += question.marks
            else:
                submitted_options = i['options']
                correct_options= question.correctAnswer()
                for j in range(len(submitted_options)):
                    for c_option in correct_options:
                        if c_option.id == j:
                            marks_gained += question.marks/len(correct_options)


        
        report = Report.objects.create(
            student=student,
            quiz=quiz,
            answered=answered,
            correct=correct,
            gained_marks=marks_gained,
        )

        serializer = ReportSerializer(report)
        return Response(serializer.data,status=status.HTTP_201_CREATED)




class ReportListView(ListCreateAPIView):

    queryset = Report.objects.all()
    serializer_class = ReportSerializer

    def get_queryset(self):
        student = Student.objects.get(pk=self.kwargs.get('student_pk'))
        return self.queryset.filter(student=student)
    


# examination page
class QuizListView(ListView):
    queryset = Quiz.objects.all()
    context_object_name = 'quizzes'
    template_name='Quiz/quiz_list.html'


    def get_context_data(self, **kwargs):
        context = super(QuizListView, self).get_context_data(**kwargs)
        context['brand'] = Brand.objects.get(id=1)
        return context

    def get_queryset(self):
        return self.queryset.filter(isActive=True)
    

    
    


class QuizDetailView(LoginRequiredMixin,DetailView):
    model = Quiz
    template_name='Quiz/quiz_detail.html'
    login_url = reverse_lazy('Accounts:web-login')

    def get_context_data(self, **kwargs):
        context = super(QuizDetailView, self).get_context_data(**kwargs)
        context['brand'] = Brand.objects.get(id=1)
        return context


class ExaminationView(LoginRequiredMixin,TemplateView):
    template_name = 'examination-ui/examination-ui.html'
    login_url = reverse_lazy('Accounts:web-login') 

    def get_context_data(self, **kwargs):
        self.request.COOKIES['Student'] = Student.objects.get(user=self.request.user)
        context = super(ExaminationView, self).get_context_data(**kwargs)
        context['brand'] = Brand.objects.get(id=1)
        context['quiz_id'] = self.kwargs.get('pk')
        return context

    def render_to_response(self, context, **response_kwargs):
        student = Student.objects.get(user=self.request.user)
        response = super(ExaminationView, self).render_to_response(context, **response_kwargs)
        response.set_cookie('student', str(student.id))
        return response


class GovermentExaminationView(LoginRequiredMixin,TemplateView):
    template_name = 'goverment-ui/goverment-ui.html'
    login_url = reverse_lazy('Accounts:web-login') 

    def get_context_data(self, **kwargs):
        self.request.COOKIES['Student'] = Student.objects.get(user=self.request.user)
        context = super(GovermentExaminationView, self).get_context_data(**kwargs)
        context['brand'] = Brand.objects.get(id=1)
        context['quiz_id'] = self.kwargs.get('pk')
        return context

    def render_to_response(self, context, **response_kwargs):
        student = Student.objects.get(user=self.request.user)
        response = super(GovermentExaminationView, self).render_to_response(context, **response_kwargs)
        response.set_cookie('student', str(student.id))
        return response


class QuestionCreateAPIView(APIView):
    def post(self,request,quiz_id):
        options = request.data['options']
        quiz = Quiz.objects.get(id=quiz_id)
        question = Question.objects.create(
            quiz = quiz,
            question_text=request.data['question_text'],
            marks = request.data['marks']

        )

        for optData in options:
            Option.objects.create(
                question = question,
                option_text = optData['option_text'],
                isCorrect = optData['isCorrect'],
            )

        serializer = QuestionSerializer(question)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
