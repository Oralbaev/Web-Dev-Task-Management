from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import TaskList, Task, Tag
from .serializers import TaskListSerializer, TaskSerializer, TagSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def tasklist_list_create(request):
    if request.method == 'GET':
        lists = TaskList.objects.filter(owner=request.user)
        serializer = TaskListSerializer(lists, many=True)
        return Response(serializer.data)
    serializer = TaskListSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def tag_list_create(request):
    if request.method == 'GET':
        tags = Tag.objects.filter(owner=request.user)
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskListDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        return get_object_or_404(TaskList, pk=pk, owner=user)

    def get(self, request, pk):
        tl = self.get_object(pk, request.user)
        serializer = TaskListSerializer(tl)
        return Response(serializer.data)

    def put(self, request, pk):
        tl = self.get_object(pk, request.user)
        serializer = TaskListSerializer(tl, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        tl = self.get_object(pk, request.user)
        tl.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        return get_object_or_404(Task, pk=pk, task_list__owner=user)

    def get(self, request, pk):
        task = self.get_object(pk, request.user)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk):
        task = self.get_object(pk, request.user)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        task = self.get_object(pk, request.user)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_list_create(request):
    if request.method == 'GET':
        qs = Task.objects.filter(task_list__owner=request.user)
        serializer = TaskSerializer(qs, many=True)
        return Response(serializer.data)
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        tl = serializer.validated_data['task_list']
        if tl.owner != request.user:
            return Response({'detail':'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        task = serializer.save()
        return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)