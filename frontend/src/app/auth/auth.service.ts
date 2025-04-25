// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

export interface AuthResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly API_BASE = 'http://localhost:8000/api/auth';
  private readonly LOGIN_URL  = `${AuthService.API_BASE}/login/`;
  private readonly REGISTER_URL = `${AuthService.API_BASE}/register/`;
  private readonly LOGOUT_URL   = `${AuthService.API_BASE}/logout/`;

  private currentUserSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.LOGIN_URL, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('username', username);
          this.currentUserSubject.next(username);
        })
      );
  }

  register(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.REGISTER_URL, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('username', username);
          this.currentUserSubject.next(username);
        })
      );
  }

  logout(): Observable<void> {
    const token = this.getToken()!;
    return this.http
      .post<void>(this.LOGOUT_URL, { token })
      .pipe(
        tap(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('username');
          this.currentUserSubject.next(null);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
