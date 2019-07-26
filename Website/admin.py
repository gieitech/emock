from django.contrib import admin
from .models import *
# Register your models here.

class HeroImageInline(admin.TabularInline):
    model = HeroImage
    extra = 2

class NormalImageInline(admin.TabularInline):
    model = NormalImage
    extra = 3

class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 3

class BranchInline(admin.TabularInline):
    model = Branch
    extra = 3


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    inlines = [HeroImageInline,NormalImageInline,BranchInline,GalleryImageInline]
    fieldsets = (
        ('Name', {
            "fields": (
              ("full_name","short_name"),  
            ),
        }),
        ('Information', {
            "fields": (
              "logo_url","short_bio","starting_year","no_of_students","no_of_teachers",  
            ),
        }),
        ('Contact Information', {
            "fields": (
              ("contact_number","address","email"),  
            ),
        }),
        ('Social Media Links', {
            "fields": (
              "facebook","twitter","instagram",  
            ),
        }),
    )
    
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Brand', {
            "fields": (
              ("brand"),  
            ),
        }),
        ('Details', {
            "fields": (
              "full_name","email","subject","message",  
            ),
        }),
    )


admin.site.register(Member)