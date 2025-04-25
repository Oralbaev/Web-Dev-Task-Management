import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class KanbanComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  newTaskTitle = '';
  newTaskDescription = '';

  nextId = 1; // Добавляем ID счётчик

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.todo = tasks.filter(t => t.status === 'todo');
      this.inProgress = tasks.filter(t => t.status === 'inProgress');
      this.done = tasks.filter(t => t.status === 'done');

      // Обновим nextId, чтобы он был больше максимального текущего ID
      const allTasks = [...this.todo, ...this.inProgress, ...this.done];
      const maxId = allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) : 0;
      this.nextId = maxId + 1;
    });
  }

  addTask() {
    const task: Task = {
      id: this.nextId++, //  Выдаём уникальный ID
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      status: 'todo'
    };
    this.taskService.addTask(task).subscribe(() => {
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.loadTasks();
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id.toString()).subscribe(() => this.loadTasks());
  }
}

  
  
    



  
    