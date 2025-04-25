# back/task/urls.py
from django.urls import path
from .views import (
    tasklist_list_create,
    task_list_create,
    TaskListDetail,
    TaskDetail,
    tag_list_create,
)

urlpatterns = [
    path('lists/',       tasklist_list_create, name='tasklist-list'),
    path('lists/<int:pk>/', TaskListDetail.as_view(), name='tasklist-detail'),
    path('tasks/',       task_list_create,     name='task-list'),
    path('tasks/<int:pk>/', TaskDetail.as_view(), name='task-detail'),
    path('tags/',        tag_list_create,      name='tag-list'),
]
