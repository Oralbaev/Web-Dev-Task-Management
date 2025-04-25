from rest_framework import serializers
from .models import TaskList, Task, Tag

class TaskListSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = TaskList
        fields = ['id', 'name', 'owner', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'status_display', 'due_date', 'task_list', 'created_at', 'updated_at']

class TagSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Tag
        fields = ['id', 'name', 'owner', 'tasks']