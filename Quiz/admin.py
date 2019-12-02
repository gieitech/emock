from django.contrib import admin
from .models import *
from django.utils.safestring import mark_safe
from django import forms
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
    extra = 1

class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline,]
    list_display = ('question','marks')
    list_filter = ['quiz']

    def question(self, obj):
        return mark_safe(
            obj.question_text,
        )
    
    
    

admin.site.register(Report)
admin.site.register(Question, QuestionAdmin)
