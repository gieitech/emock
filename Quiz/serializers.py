from rest_framework.serializers import (
    ModelSerializer,
    CharField,
    BooleanField,
    IntegerField,
)
from .models import *

class OptionSerializer(ModelSerializer):

    class Meta:
        model = Option
        fields = '__all__'


class QuestionSerializer(ModelSerializer):
    options = OptionSerializer(many=True)
    isMultipleCorrect = BooleanField()
    
    class Meta:
        model = Question
        fields = '__all__'

class QuizCreateSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class QuizDetailsSerializer(ModelSerializer):
    questions = QuestionSerializer(many=True)
    no_of_questions = IntegerField()
    full_marks = IntegerField()
    class Meta:
        model = Quiz
        fields = '__all__'


class QuizSerializer(ModelSerializer):
    no_of_questions = IntegerField()
    full_marks = IntegerField()
    class Meta:
        model = Quiz
        fields = '__all__'



class ReportSerializer(ModelSerializer):
    quiz = QuizSerializer()
    class Meta:
        model = Report
        fields = '__all__'