from django.db import models
from random import randrange
# Create your models here.
class Brand(models.Model):
    full_name = models.CharField(max_length=150)
    short_name = models.CharField(blank=True, max_length=50)
    logo_url = models.URLField(blank=True, max_length=400)
    short_bio = models.TextField()
    starting_year = models.IntegerField()
    no_of_students = models.IntegerField()
    no_of_teachers = models.IntegerField()
    contact_number = models.DecimalField(max_digits=10, decimal_places=0)
    address = models.TextField()
    email = models.EmailField(max_length=354)

    facebook = models.URLField(max_length=400,blank=True)
    twitter = models.URLField(max_length=400,blank=True)
    instagram = models.URLField(max_length=400,blank=True)

    def __str__(self):
        return self.full_name

    @property
    def random_hero_image(self):
        return self.heroimage_set.all()[randrange(0,self.heroimage_set.count())].image_url

    @property
    def random_normal_image(self):
        return self.normalimage_set.all()[randrange(0,self.normalimage_set.count())].image_url

class HeroImage(models.Model):
    brand = models.ForeignKey(Brand , on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    caption = models.CharField(max_length=150)
    image_url = models.URLField(blank=True , max_length=400)

    def __str__(self):
        return self.caption

class NormalImage(models.Model):
    brand = models.ForeignKey(Brand , on_delete=models.CASCADE)
    caption = models.CharField(max_length=150)
    image_url = models.URLField(blank=True , max_length=400)

    def __str__(self):
        return self.caption


class Branch(models.Model):
    brand = models.ForeignKey(Brand , on_delete=models.CASCADE)
    location = models.CharField(max_length=50)
    g_map_embed = models.TextField()
    address = models.CharField(max_length=50)

    def __str__(self):
        return self.location

class Member(models.Model):
    brand = models.ForeignKey(Brand , on_delete=models.CASCADE)
    full_name = models.CharField(max_length=150)
    about = models.TextField()
    display_image = models.URLField(max_length=300)
    position = models.CharField(max_length=150)

    def __str__(self):
        return self.full_name

class GalleryImage(models.Model):
    brand = models.ForeignKey(Brand , on_delete=models.CASCADE)
    caption = models.CharField(max_length=150)
    image_url = models.URLField(max_length=400)

    def __str__(self):
        return self.caption


class ContactMessage(models.Model):
    brand = models.ForeignKey(Brand , on_delete=models.CASCADE)
    full_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=354)
    subject = models.CharField(max_length=150)
    message = models.TextField()

    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name