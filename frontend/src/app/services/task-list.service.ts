// src/app/services/task-list.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list.model';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private static readonly API_BASE = 'http://localhost:8000/api';
  private readonly URL = `${TaskListService.API_BASE}/lists/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.URL);
  }

  getById(id: number): Observable<TaskList> {
    return this.http.get<TaskList>(`${this.URL}${id}/`);
  }

  create(name: string): Observable<TaskList> {
    return this.http.post<TaskList>(this.URL, { name });
  }

  update(id: number, name: string): Observable<TaskList> {
    return this.http.put<TaskList>(`${this.URL}${id}/`, { name });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}${id}/`);
  }
}
