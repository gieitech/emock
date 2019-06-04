from django.db import models
from Accounts.models import Student

# Create your models here.
class Quiz(models.Model):
    name = models.CharField(max_length=200)
    syllabus = models.TextField(blank=True , null=True)

    
    allotted_time_in_minutes = models.IntegerField()
    negative_marking = models.BooleanField(default=False)
    cover_image_url = models.URLField(max_length=300)

    isActive = models.BooleanField(default=False)
    pub_date = models.DateField(auto_now_add=True)


    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Quizzes'

    def full_marks(self):
        marks = 0
        for question in self.question_set.all():
            marks += question.marks
        return marks

    @property
    def questions(self):
        return self.question_set.all()

    @property
    def no_of_questions(self):
        return self.question_set.count()


class Question(models.Model):
    quiz = models.ForeignKey(Quiz , on_delete=models.CASCADE)
    question_text = models.TextField()
    
    pub_date = models.DateField(auto_now_add=True)
    pub_time = models.TimeField(auto_now_add=True)

    
    marks = models.IntegerField()

    def __str__(self):
        return self.question_text
    
    @property
    def options(self):
        return self.option_set.all().order_by("?")


    @property
    def isMultipleCorrect(self):
        correctOptions = self.option_set.filter(isCorrect=True)
        if correctOptions.count() > 1:
            return True
        return False

    
    def correctAnswer(self):
        if not self.isMultipleCorrect : 
            return self.option_set.get(isCorrect=True)
        return self.option_set.filter(isCorrect=True)
        

        
        
class Option(models.Model):

    question = models.ForeignKey(Question , on_delete=models.CASCADE)
    option_text = models.TextField()
    isCorrect = models.BooleanField(default=False)

    def __str__(self):
        return self.option_text




class Report(models.Model):

    student = models.ForeignKey(Student , on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz , on_delete=models.CASCADE)
    answered = models.IntegerField()
    correct = models.IntegerField()
    gained_marks = models.IntegerField()

    submission_date = models.DateField(auto_now_add=True)
    submission_time = models.TimeField(auto_now_add=True)

    def un_answered(self):
        return self.quiz.no_of_questions() - self.answered
    
    def incorrect(self):
        return self.answered - self.correct


    def __str__(self):
        return str(self.student)+" , "+str(self.quiz)