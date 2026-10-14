export interface DjangoFileSnippet {
  filename: string;
  path: string;
  description: string;
  language: string;
  code: string;
}

export interface DjangoStage {
  id: string;
  title: string;
  subtitle: string;
  explanation: string;
  commands?: string[];
  files: DjangoFileSnippet[];
}

export const DJANGO_FOLDER_STRUCTURE = `college_project/
├── manage.py                     # Command-line utility to run server, migrate, etc.
├── db.sqlite3                    # Local SQLite database file (created after migrate)
├── requirements.txt              # Python package dependencies
├── Procfile                      # Deployment process config for Render / Heroku
├── college_portal/               # Main Project Configuration folder
│   ├── __init__.py
│   ├── settings.py               # Database, installed apps, static & media configs
│   ├── urls.py                   # Root URL routing table
│   ├── asgi.py
│   └── wsgi.py                   # Web Server Gateway Interface for deployment
├── core/                         # Main Django App (handles public & student portal)
│   ├── __init__.py
│   ├── admin.py                  # Register models to view in /admin
│   ├── apps.py
│   ├── forms.py                  # HTML Form validation & ModelForms
│   ├── models.py                 # Database schemas (Student, Attendance, Marks, etc.)
│   ├── views.py                  # Logic handlers (request -> processing -> response)
│   ├── urls.py                   # App-specific URL routes
│   └── migrations/               # Database migration versions
│       └── 0001_initial.py
├── static/                       # Static assets (CSS, JS, Images, Bootstrap)
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── media/                        # User uploaded files (study material PDFs, receipts)
│   └── study_materials/
└── templates/                    # HTML Templates with Bootstrap 5
    ├── base.html                 # Master layout (Navbar + Content + Footer)
    ├── public/
    │   ├── home.html
    │   ├── about.html
    │   ├── departments.html
    │   ├── courses.html
    │   ├── admissions.html
    │   ├── fees.html
    │   ├── placements.html
    │   └── contact.html
    ├── student/
    │   ├── dashboard.html
    │   ├── attendance.html
    │   ├── marks.html
    │   ├── timetable.html
    │   ├── materials.html
    │   ├── fee_status.html
    │   └── leave_apply.html
    └── registration/
        └── login.html`;

export const DJANGO_SETUP_COMMANDS = [
  '# 1. Open Terminal / Command Prompt and create your project folder',
  'mkdir college_project',
  'cd college_project',
  '',
  '# 2. Create a Python Virtual Environment (Keeps packages isolated)',
  'python -m venv venv',
  '',
  '# 3. Activate the Virtual Environment',
  '# On Windows (cmd):     venv\\Scripts\\activate',
  '# On Windows (PowerShell): .\\venv\\Scripts\\Activate.ps1',
  '# On Mac / Linux:       source venv/bin/activate',
  '',
  '# 4. Install Django, Pillow (for image/file uploads), and python-dotenv',
  'pip install django pillow python-dotenv gunicorn whitenoise',
  '',
  '# 5. Start a new Django Project called "college_portal"',
  'django-admin startproject college_portal .',
  '',
  '# 6. Create our main App called "core"',
  'python manage.py startapp core',
  '',
  '# 7. Run initial database migrations (creates default SQLite auth tables)',
  'python manage.py migrate',
  '',
  '# 8. Create an administrator account (Admin Panel username & password)',
  'python manage.py createsuperuser',
  '',
  '# 9. Start the local development web server!',
  'python manage.py runserver',
  '# Open http://127.0.0.1:8000/ in your browser!'
];

export const DJANGO_STAGES: DjangoStage[] = [
  {
    id: 'stage-1',
    title: 'Stage 1: Project Setup & Public Pages',
    subtitle: 'Foundation: Django settings, root URLs, Bootstrap 5 master template, and public views',
    explanation: 'As a 1st year CSE student coming from C and Python: in C you write main() functions that run sequentially. In Django, the web server listens for HTTP requests. When a user visits a URL, Django checks urls.py, calls a Python function in views.py, and renders an HTML file in templates/ filled with dynamic variables.',
    files: [
      {
        filename: 'settings.py',
        path: 'college_portal/settings.py',
        description: 'Configure INSTALLED_APPS, TEMPLATES directory, STATIC and MEDIA folders for user uploads.',
        language: 'python',
        code: `import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-replace-this-in-production-with-env-variable'
DEBUG = True
ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Our custom app
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # For static files in deployment
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'college_portal.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'], # Look in global templates/ folder
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'college_portal.wsgi.application'

# Database: SQLite for development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Static & Media Files
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

LOGIN_REDIRECT_URL = 'student_dashboard'
LOGOUT_REDIRECT_URL = 'home'
`
      },
      {
        filename: 'base.html',
        path: 'templates/base.html',
        description: 'Master Bootstrap 5 template with responsive blue/white navigation and footer. Other pages inherit this via {% extends "base.html" %}.',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Apex Institute of Technology{% endblock %}</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        :root {
            --primary-blue: #0f3d6e;
            --accent-blue: #1e6091;
            --light-bg: #f8fafc;
        }
        body { font-family: 'Segoe UI', system-ui, sans-serif; background-color: var(--light-bg); }
        .bg-college { background-color: var(--primary-blue) !important; }
        .text-college { color: var(--primary-blue) !important; }
        .btn-college { background-color: var(--primary-blue); color: white; }
        .btn-college:hover { background-color: var(--accent-blue); color: white; }
    </style>
</head>
<body class="d-flex flex-column min-vh-100">

    <!-- Top Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-college shadow-sm sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="{% url 'home' %}">
                <i class="bi bi-mortarboard-fill me-2"></i>Apex Institute of Tech
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                    <li class="nav-item"><a class="nav-link" href="{% url 'home' %}">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="{% url 'about' %}">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="{% url 'departments' %}">Departments</a></li>
                    <li class="nav-item"><a class="nav-link" href="{% url 'courses' %}">Courses</a></li>
                    <li class="nav-item"><a class="nav-link" href="{% url 'admissions' %}">Admissions</a></li>
                    <li class="nav-item"><a class="nav-link" href="{% url 'placements' %}">Placements</a></li>
                    <li class="nav-item"><a class="nav-link" href="{% url 'notices' %}">Notices</a></li>
                    <li class="nav-item"><a class="nav-link" href="{% url 'contact' %}">Contact</a></li>
                    
                    {% if user.is_authenticated %}
                        <li class="nav-item ms-lg-3">
                            <a class="btn btn-warning btn-sm fw-bold px-3" href="{% url 'student_dashboard' %}">
                                <i class="bi bi-speedometer2 me-1"></i>Portal
                            </a>
                        </li>
                        <li class="nav-item ms-2">
                            <a class="nav-link" href="{% url 'logout' %}"><i class="bi bi-box-arrow-right"></i></a>
                        </li>
                    {% else %}
                        <li class="nav-item ms-lg-3">
                            <a class="btn btn-outline-light btn-sm px-3" href="{% url 'login' %}">
                                <i class="bi bi-person-circle me-1"></i>Student Login
                            </a>
                        </li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content Block -->
    <main class="flex-grow-1">
        {% if messages %}
            <div class="container mt-3">
                {% for message in messages %}
                    <div class="alert alert-{{ message.tags }} alert-dismissible fade show" role="alert">
                        {{ message }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                {% endfor %}
            </div>
        {% endif %}

        {% block content %}{% endblock %}
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white pt-5 pb-3 mt-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <h5 class="fw-bold text-white"><i class="bi bi-mortarboard me-2"></i>Apex Institute of Technology</h5>
                    <p class="text-white-50 small">Autonomous Institution approved by AICTE. NAAC A++ accredited campus delivering transformative engineering education.</p>
                </div>
                <div class="col-md-2">
                    <h6 class="text-white fw-bold">Quick Links</h6>
                    <ul class="list-unstyled small">
                        <li><a href="{% url 'departments' %}" class="text-white-50 text-decoration-none">Departments</a></li>
                        <li><a href="{% url 'admissions' %}" class="text-white-50 text-decoration-none">Admissions</a></li>
                        <li><a href="{% url 'placements' %}" class="text-white-50 text-decoration-none">Placements</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h6 class="text-white fw-bold">Student Desk</h6>
                    <ul class="list-unstyled small">
                        <li><a href="{% url 'student_dashboard' %}" class="text-white-50 text-decoration-none">Student Portal</a></li>
                        <li><a href="{% url 'notices' %}" class="text-white-50 text-decoration-none">Exam Circulars</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h6 class="text-white fw-bold">Contact Campus</h6>
                    <p class="text-white-50 small mb-1"><i class="bi bi-geo-alt me-2"></i>Knowledge City, Hyderabad</p>
                    <p class="text-white-50 small mb-1"><i class="bi bi-telephone me-2"></i>+91 (040) 2345-6789</p>
                    <p class="text-white-50 small"><i class="bi bi-envelope me-2"></i>info@apexinstitute.edu.in</p>
                </div>
            </div>
            <hr class="border-secondary my-4">
            <div class="text-center text-white-50 small">
                © 2026 Apex Institute of Technology · Built with Python & Django
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`
      },
      {
        filename: 'urls.py',
        path: 'core/urls.py',
        description: 'URL dispatcher mapping paths to view functions.',
        language: 'python',
        code: `from django.urls import path
from . import views

urlpatterns = [
    # Public Pages
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('departments/', views.departments, name='departments'),
    path('courses/', views.courses, name='courses'),
    path('admissions/', views.admissions, name='admissions'),
    path('fees/', views.fees, name='fees'),
    path('placements/', views.placements, name='placements'),
    path('notices/', views.notices, name='notices'),
    path('contact/', views.contact, name='contact'),

    # Student Portal (Login Required)
    path('portal/dashboard/', views.student_dashboard, name='student_dashboard'),
    path('portal/attendance/', views.student_attendance, name='student_attendance'),
    path('portal/marks/', views.student_marks, name='student_marks'),
    path('portal/timetable/', views.student_timetable, name='student_timetable'),
    path('portal/materials/', views.student_materials, name='student_materials'),
    path('portal/fee-status/', views.student_fees, name='student_fees'),
    path('portal/leave-apply/', views.student_leave_apply, name='student_leave_apply'),
]
`
      }
    ]
  },
  {
    id: 'stage-2',
    title: 'Stage 2: Database Models & Student Authentication',
    subtitle: 'Database schemas in models.py and Django Authentication System',
    explanation: 'In C, you use structs to group variables in memory. In Django, models.Model is like a super-struct that connects directly to the SQLite database! Django automatically generates SQL tables with columns, constraints, and relationships.',
    files: [
      {
        filename: 'models.py',
        path: 'core/models.py',
        description: 'Defines the SQLite database tables for Student Profiles, Faculty, Attendance, Results, Study Materials, and Leaves.',
        language: 'python',
        code: `from django.db import models
from django.contrib.auth.models import User

# User Roles
ROLE_CHOICES = (
    ('student', 'Student'),
    ('faculty', 'Faculty'),
    ('admin', 'Admin'),
)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    phone = models.CharField(max_length=15, blank=True)
    profile_pic = models.ImageField(upload_to='profiles/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} ({self.role})"

class Department(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    hod_name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Student(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='student_info')
    roll_number = models.CharField(max_length=20, unique=True)
    registration_no = models.CharField(max_length=30, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    semester = models.PositiveSmallIntegerField(default=1)
    batch = models.CharField(max_length=20, default='2024 - 2028')
    blood_group = models.CharField(max_length=5, blank=True)
    advisor_name = models.CharField(max_length=100, default='Dr. Sunita Rao')

    def __str__(self):
        return f"{self.roll_number} - {self.user_profile.user.get_full_name()}"

class Subject(models.Model):
    code = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    semester = models.PositiveSmallIntegerField()
    credits = models.PositiveSmallIntegerField(default=3)

    def __str__(self):
        return f"{self.code}: {self.name}"

class AttendanceRecord(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    total_classes = models.PositiveIntegerField(default=0)
    classes_attended = models.PositiveIntegerField(default=0)

    @property
    def percentage(self):
        if self.total_classes == 0:
            return 0.0
        return round((self.classes_attended / self.total_classes) * 100, 1)

    def __str__(self):
        return f"{self.student.roll_number} - {self.subject.code} ({self.percentage}%)"

class SemesterResult(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='results')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    semester = models.PositiveSmallIntegerField()
    internal_marks = models.PositiveSmallIntegerField(default=0) # out of 30
    mid_term_marks = models.PositiveSmallIntegerField(default=0)  # out of 30
    end_term_marks = models.PositiveSmallIntegerField(default=0)  # out of 40
    grade = models.CharField(max_length=2, default='A')
    grade_point = models.PositiveSmallIntegerField(default=9)

    @property
    def total_marks(self):
        return self.internal_marks + self.mid_term_marks + self.end_term_marks
`
      },
      {
        filename: 'views.py',
        path: 'core/views.py',
        description: 'View functions that query SQLite via models and pass data into templates.',
        language: 'python',
        code: `from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Student, AttendanceRecord, SemesterResult, Department, Subject

def home(request):
    return render(request, 'public/home.html')

def about(request):
    return render(request, 'public/about.html')

def departments(request):
    depts = Department.objects.all()
    return render(request, 'public/departments.html', {'departments': depts})

def courses(request):
    return render(request, 'public/courses.html')

def admissions(request):
    return render(request, 'public/admissions.html')

def fees(request):
    return render(request, 'public/fees.html')

def placements(request):
    return render(request, 'public/placements.html')

def contact(request):
    if request.method == 'POST':
        # Process contact inquiry
        messages.success(request, 'Your message has been sent successfully! Our academic counselor will reach out shortly.')
        return redirect('contact')
    return render(request, 'public/contact.html')

@login_required
def student_dashboard(request):
    try:
        student = request.user.profile.student_info
        attendance_list = AttendanceRecord.objects.filter(student=student)
        latest_results = SemesterResult.objects.filter(student=student, semester=student.semester - 1)
        
        context = {
            'student': student,
            'attendance_list': attendance_list,
            'results': latest_results,
        }
        return render(request, 'student/dashboard.html', context)
    except Exception as e:
        messages.error(request, 'Student profile not linked to this account.')
        return redirect('home')
`
      }
    ]
  },
  {
    id: 'stage-3',
    title: 'Stage 3: Attendance, Marks, Study Material & Notices',
    subtitle: 'Building the core academic modules and interactive calculation logic',
    explanation: 'Now we implement the modules the student interacts with daily: calculating whether their attendance meets the 75% AICTE threshold, downloading teacher lecture slides, and applying for leaves.',
    files: [
      {
        filename: 'materials_models.py',
        path: 'core/models.py (addition)',
        description: 'Models for College Notices, Downloadable Study Material PDFs, and Leave Requests.',
        language: 'python',
        code: `class Notice(models.Model):
    CATEGORY_CHOICES = (
        ('Academic', 'Academic'),
        ('Examination', 'Examination'),
        ('Placement', 'Placement'),
        ('General', 'General'),
    )
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Academic')
    date_posted = models.DateField(auto_now_add=True)
    content = models.TextField()
    reference_no = models.CharField(max_length=50)
    is_important = models.BooleanField(default=False)
    attachment = models.FileField(upload_to='notices/', blank=True, null=True)

    def __str__(self):
        return f"[{self.category}] {self.title}"

class StudyMaterial(models.Model):
    title = models.CharField(max_length=200)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    unit = models.CharField(max_length=50, default='Unit 1')
    uploaded_by = models.CharField(max_length=100)
    date_uploaded = models.DateField(auto_now_add=True)
    file = models.FileField(upload_to='study_materials/')

    def __str__(self):
        return f"{self.subject.code} - {self.title}"

class LeaveRequest(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    date_applied = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    admin_remarks = models.TextField(blank=True)
`
      },
      {
        filename: 'attendance.html',
        path: 'templates/student/attendance.html',
        description: 'Attendance tracking dashboard template with 75% threshold indicator and interactive calculator.',
        language: 'html',
        code: `{% extends "base.html" %}
{% block title %}My Attendance | Student Portal{% endblock %}

{% block content %}
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold mb-0 text-college">Attendance Tracker</h2>
            <p class="text-muted small">Minimum 75% attendance mandatory for Semester End Examinations.</p>
        </div>
        <a href="{% url 'student_dashboard' %}" class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-arrow-left me-1"></i>Back to Dashboard
        </a>
    </div>

    <!-- Attendance Cards Grid -->
    <div class="row g-3">
        {% for att in attendance_list %}
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-primary">{{ att.subject.code }}</span>
                        {% if att.percentage >= 75 %}
                            <span class="badge bg-success">Eligible ({{ att.percentage }}%)</span>
                        {% else %}
                            <span class="badge bg-danger">Low Attendance! ({{ att.percentage }}%)</span>
                        {% endif %}
                    </div>
                    <h6 class="fw-bold text-dark">{{ att.subject.name }}</h6>
                    <p class="small text-muted mb-2">Attended: {{ att.classes_attended }} / {{ att.total_classes }} classes</p>
                    
                    <div class="progress" style="height: 8px;">
                        <div class="progress-bar {% if att.percentage >= 75 %}bg-success{% else %}bg-danger{% endif %}" 
                             role="progressbar" style="width: {{ att.percentage }}%;"></div>
                    </div>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>
{% endblock %}
`
      }
    ]
  },
  {
    id: 'stage-4',
    title: 'Stage 4: Admin & Faculty Controls',
    subtitle: 'Customizing Django Admin, custom forms, and role-based permissions',
    explanation: 'Django has a built-in admin panel at /admin that is generated automatically! You just need to register your models in admin.py. You can also create role-based views using decorators like @user_passes_test.',
    files: [
      {
        filename: 'admin.py',
        path: 'core/admin.py',
        description: 'Registers models in Django Admin with search fields, list filters, and inline tabular editing.',
        language: 'python',
        code: `from django.contrib import admin
from .models import UserProfile, Department, Student, Subject, AttendanceRecord, SemesterResult, Notice, StudyMaterial, LeaveRequest

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'phone')
    list_filter = ('role',)

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'get_name', 'department', 'semester', 'batch')
    search_fields = ('roll_number', 'user_profile__user__first_name', 'user_profile__user__last_name')
    list_filter = ('department', 'semester', 'batch')

    def get_name(self, obj):
        return obj.user_profile.user.get_full_name()
    get_name.short_description = 'Student Name'

@admin.register(AttendanceRecord)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'classes_attended', 'total_classes', 'percentage')
    list_filter = ('subject', 'student__department')

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date_posted', 'is_important')
    list_filter = ('category', 'is_important')
    search_fields = ('title', 'content')

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('student', 'leave_type', 'start_date', 'end_date', 'status')
    list_filter = ('status', 'leave_type')
    actions = ['approve_leaves', 'reject_leaves']

    def approve_leaves(self, request, queryset):
        queryset.update(status='Approved')
    approve_leaves.short_description = "Approve selected student leave requests"

admin.site.register(Department)
admin.site.register(Subject)
admin.site.register(SemesterResult)
admin.site.register(StudyMaterial)
`
      }
    ]
  },
  {
    id: 'stage-5',
    title: 'Stage 5: Polish & Free Cloud Deployment',
    subtitle: 'Deploying on PythonAnywhere or Render with requirements.txt & wsgi.py',
    explanation: 'Now you can put your college website online for free so your professors, classmates, or recruiters can view it! We configure Whitenoise for static files, create requirements.txt, and configure the WSGI runner.',
    files: [
      {
        filename: 'requirements.txt',
        path: 'requirements.txt',
        description: 'Lists all pip packages required to run the Django web application on Render or PythonAnywhere.',
        language: 'text',
        code: `Django==5.0.4
Pillow==10.3.0
gunicorn==22.0.0
whitenoise==6.6.0
python-dotenv==1.0.1
`
      },
      {
        filename: 'Procfile',
        path: 'Procfile',
        description: 'Process configuration file for hosting on Render or Heroku.',
        language: 'text',
        code: `web: gunicorn college_portal.wsgi:application --log-file -
`
      },
      {
        filename: 'DEPLOYMENT_GUIDE.md',
        path: 'docs/DEPLOYMENT_GUIDE.md',
        description: 'Step-by-step instructions for 100% free hosting on PythonAnywhere and Render.',
        language: 'markdown',
        code: `# Free Hosting Guide for 1st Year B.Tech Students

## Option A: PythonAnywhere (Easiest for Beginners, No Credit Card)
1. Sign up for a free "Beginner" account at https://www.pythonanywhere.com
2. Go to the "Consoles" tab and open a **Bash** console.
3. Clone your GitHub repository:
   \`\`\`bash
   git clone https://github.com/your-username/college_project.git
   cd college_project
   \`\`\`
4. Create and activate virtualenv:
   \`\`\`bash
   mkvirtualenv --python=/usr/bin/python3.10 college-venv
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   \`\`\`
5. Go to the "Web" tab:
   - Click "Add a new web app" -> Choose Manual Configuration -> Python 3.10.
   - Set Virtualenv path to: \`/home/yourusername/.virtualenvs/college-venv\`
   - Edit the WSGI configuration file:
     Point it to your project path: \`/home/yourusername/college_project\`
     Set \`os.environ['DJANGO_SETTINGS_MODULE'] = 'college_portal.settings'\`
6. Click the green "Reload" button and visit \`https://yourusername.pythonanywhere.com\`!

---

## Option B: Render.com
1. Push your code to GitHub (including \`Procfile\` and \`requirements.txt\`).
2. Go to https://render.com and sign up.
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Set:
   - **Environment**: Python 3
   - **Build Command**: \`pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput\`
   - **Start Command**: \`gunicorn college_portal.wsgi:application\`
6. Click "Create Web Service". Render will deploy your live link within 2 minutes!
`
      }
    ]
  }
];
