from django.contrib import admin
from .models import TaskList, Task, Tag

admin.site.register(TaskList)
admin.site.register(Task)
admin.site.register(Tag)
