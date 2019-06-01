from django.contrib import admin
from .models import *
# Register your models here.


class QuestionInline(admin.StackedInline):
    model = Question
    extra = 1

class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionInline,]
    list_display = ('name','isActive' , 'pub_date')

admin.site.register(Quiz, QuizAdmin)

class OptionInline(admin.TabularInline):
    model = Option
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline,]
    list_display = ('question_text','marks')

admin.site.register(Question, QuestionAdmin)
