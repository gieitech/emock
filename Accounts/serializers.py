from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth.models import User , Group
from rest_framework.authtoken.models import Token

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name','last_name','email','username','password')
        extra_kwargs = {
            'password' : {
                'write_only' : True,
            }
        }



class StudentSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = "__all__"

    def create(self , validated_data):

        user = User.objects.create(
            first_name=validated_data['user']['first_name'],
            last_name=validated_data['user']['last_name'],
            username=validated_data['user']['username'],
            email=validated_data['user']['email'],
        )
        user.set_password(validated_data['user']['password']),
        user.save()
        Student.objects.create(
            user=user,
            contact_number=validated_data['contact_number'],
            middle_name=validated_data['middle_name'],
        )

        Token.objects.create(user=user)


        return validated_data