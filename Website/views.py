from django.views.generic import (
    TemplateView,
)
from .models import *
from Quiz.models import Quiz
# Create your views here.
class HomeView(TemplateView):
    template_name = 'Website/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["brand"] = Brand.objects.get(id=1)
        context['quizzes'] = Quiz.objects.filter(isActive=True).order_by("?")[:4]
        context['members'] = Member.objects.filter(brand__id=1)
        return context
    

class AboutView(TemplateView):
    template_name = 'Website/about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["brand"] = Brand.objects.get(id=1)
        return context


class ContactView(TemplateView):
    template_name = 'Website/contact.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["brand"] = Brand.objects.get(id=1)
        return context