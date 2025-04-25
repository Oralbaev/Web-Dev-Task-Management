// src/app/services/tag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag }        from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagService {
  private static readonly API_BASE = 'http://localhost:8000/api';
  private readonly URL = `${TagService.API_BASE}/tags/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.URL);
  }

  create(name: string): Observable<Tag> {
    return this.http.post<Tag>(this.URL, { name });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}${id}/`);
  }
}
