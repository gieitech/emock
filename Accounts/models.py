from django.db import models
from django.contrib.auth.models import User , Group
# Create your models here.

class Student(models.Model):

    user = models.OneToOneField(User , on_delete=models.CASCADE)
    middle_name = models.CharField(max_length=50,blank=True,null=True)
    date_of_birth = models.DateField(blank=True,null=True)
    display_image_url = models.URLField(max_length=400,blank=True,null=True)
    about = models.TextField(blank=True,null=True)

    contact_number = models.DecimalField(max_digits=10,decimal_places=0)
    address = models.TextField(blank=True,null=True)

    def full_name(self):
        return str(self.user.first_name)+" "+str(self.middle_name)+" "+str(self.user.last_name)

    def __str__(self):
        return str(self.full_name())


    
