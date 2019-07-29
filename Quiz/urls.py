from django.urls import path
from .views import *

app_name = 'Quiz'

urlpatterns = [
    path('list/', QuizListCreate.as_view(),name='quiz-list-create'),
    path('<int:pk>/details/',QuizEditDelete.as_view(),name='quiz-edit'),
    path('<int:quiz_id>/questions/',QuestionListCreate.as_view(),name='question-list-create'),

    path('<int:quiz_id>/generate-report/<int:student_id>/', GenerateReport.as_view(),name='generate-report'),
    path('student/<int:student_pk>/reports/', ReportListView.as_view(),name='report-list-create'),

    # website view
    path('web-list/',QuizListView.as_view(),name='list'),
    path('<int:pk>/web-detail/',QuizDetailView.as_view(),name='quiz-web-detail'),
    path('<int:pk>/examination/',ExaminationView.as_view(),name='examination'),
]