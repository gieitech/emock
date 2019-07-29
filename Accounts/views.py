from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    
)
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.views import (
    LoginView,
    FormView,
)
from Website.models import Brand
from .forms import (
    StudentRegisterForm,
)
from django.views.generic import (
    TemplateView,
)
from django.urls import reverse_lazy
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

class StudentFromUsername(APIView):

    def post(self,request):
        username = request.data['username']
        student = Student.objects.get(user=User.objects.get(username=username))
        serializer  = StudentSerializer(student)
        return Response(serializer.data , status = status.HTTP_200_OK)


# web views
class WebLoginView(LoginView):
    template_name = 'Accounts/login.html'

    def get_context_data(self, **kwargs):
        context = super(WebLoginView, self).get_context_data(**kwargs)
        context['brand'] = Brand.objects.get(id=1)
        return context


class StudentRegisterView(FormView):
    form_class = StudentRegisterForm
    template_name = 'Accounts/register.html'
    success_url = reverse_lazy('Accounts:web-login')

    def get_context_data(self, **kwargs):
        context = super(StudentRegisterView, self).get_context_data(**kwargs)
        context['brand'] = Brand.objects.get(id=1)
        return context

    def form_valid(self, form):
        print(form.cleaned_data)
        user = User.objects.create(
            first_name = form.cleaned_data['first_name'],
            last_name  = form.cleaned_data['last_name'],
            email      = form.cleaned_data['email'],
            username   = form.cleaned_data['username'],
        )
        user.set_password(form.cleaned_data['password'])
        user.is_active = False
        user.save()

        Student.objects.create(
            user=user,
            middle_name = form.cleaned_data['middle_name'],
            contact_number = form.cleaned_data['contact_number'],
            date_of_birth = form.cleaned_data['date_of_birth'],
            display_image_url = form.cleaned_data['display_image_url'],
            about = form.cleaned_data['about'],
            address = form.cleaned_data['address'],
        )
        Token.objects.create(user=user)
        return super(StudentRegisterView, self).form_valid(form)


class ProfileView(TemplateView):
    template_name = 'Accounts/profile.html'

    def get_context_data(self, **kwargs):
        context = super(ProfileView, self).get_context_data(**kwargs)
        user = self.request.user
        if not(user.is_staff):
            context['student'] = Student.objects.get(user=user)
        
        context['brand'] = Brand.objects.get(id=1)
        return context



