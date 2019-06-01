from rest_framework.serializers import ModelSerializer
from .models import *

class OptionSerializer(ModelSerializer):

    class Meta:
        model = Option
        fields = '__all__'


class QuestionSerializer(ModelSerializer):
    options = OptionSerializer(many=True)
    class Meta:
        model = Question
        fields = '__all__'



class QuizSerializer(ModelSerializer):
    
    class Meta:
        model = Quiz
        fields = '__all__'