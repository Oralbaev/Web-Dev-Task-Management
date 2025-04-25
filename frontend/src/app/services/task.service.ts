// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';

export interface TaskUpsert {
  title: string;
  description?: string;
  status?: Task['status'];
  due_date?: string | null;
  task_list: number;
  tags?: number[];
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private static readonly API_BASE = 'http://localhost:8000/api';
  private readonly LIST_TASKS_URL = `${TaskService.API_BASE}/lists`;
  private readonly TASK_URL       = `${TaskService.API_BASE}/tasks`;

  constructor(private http: HttpClient) {}

  getAll(listId: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.TASK_URL}/`)
      .pipe(
        map(tasks => tasks.filter(t => t.task_list === listId))
      );
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.TASK_URL}/${id}/`);
  }

  create(data: TaskUpsert): Observable<Task> {
    return this.http.post<Task>(`${this.TASK_URL}/`, data);
  }

  update(id: number, data: TaskUpsert): Observable<Task> {
    return this.http.put<Task>(`${this.TASK_URL}/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.TASK_URL}/${id}/`);
  }
}
