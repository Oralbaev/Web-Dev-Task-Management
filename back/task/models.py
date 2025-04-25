from datetime import timezone
from django.db import models
from django.conf import settings

# Create your models here.
class TaskList(models.Model):
    name = models.TextField(default='')
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='lists',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} ({self.owner})'
    
class Task(models.Model):
    STATUS_CHOICES = [
        ('P', 'Pending'),
        ('I', 'In Progress'),
        ('D', 'Done'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES,
        default='P'
    )
    due_date = models.DateField(null=True, blank=True)
    task_list = models.ForeignKey(
        TaskList,
        related_name='tasks',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class Tag(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='tags',
        on_delete=models.CASCADE
    )
    tasks = models.ManyToManyField(
        Task,
        related_name='tags',
        blank=True
    )

    def __str__(self):
        return self.name