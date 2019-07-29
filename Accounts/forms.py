from django import forms

class StudentRegisterForm(forms.Form):
    first_name = forms.CharField(label='Your First Name',max_length=150)
    middle_name = forms.CharField(max_length=150,required=False)
    last_name = forms.CharField(max_length=150)

    username = forms.CharField(label='Choose a Username',max_length=20)
    email = forms.EmailField(max_length=300)
    contact_number = forms.DecimalField(max_digits=10,decimal_places=0)
    address = forms.CharField(widget=forms.Textarea,required=False)
    date_of_birth = forms.DateField()
    display_image_url = forms.URLField(max_length=500,required=False)
    about = forms.CharField(widget=forms.Textarea,required=False)

    password = forms.CharField(min_length=8,max_length=20,widget=forms.PasswordInput)
    re_password  = forms.CharField(min_length=8,max_length=20,widget=forms.PasswordInput)

    def clean_username(self):
        print(self.cleaned_data)
        username = self.cleaned_data['username']
        if len(username) < 8 :
            raise forms.ValidationError("Username must be 8 or more characters")
        return username

    def clean_password(self):
        print(self.cleaned_data)
        temp_password = self.cleaned_data['password']
        if len(temp_password) == 0:
            raise forms.ValidationError("You Must choose a password")

        if len(temp_password) < 8 and len(temp_password) > 0:
            raise forms.ValidationError("Password must be 8 characters long")

        return temp_password

    def clean_re_password(self):
        print(self.cleaned_data)
        password = self.cleaned_data['password']
        print(password)
        
        re_password = self.cleaned_data['re_password']
        print(re_password)
        if len(re_password) == 0 :
            raise forms.ValidationError("You Must Confirm Your Password")
        if len(re_password) < 8 and len(re_password) > 0:
            raise forms.ValidationError("Password must be 8 characters long")
        if password != re_password:
            raise forms.ValidationError("Passwords don't match")
        
        return re_password