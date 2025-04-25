import { Component } from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';
  
    if (!this.username.trim() || !this.password) {
      this.errorMessage = 'Введите имя пользователя и пароль';
      return;
    }
  
    this.auth.register(this.username, this.password)
      .subscribe({
        next: () => {
          this.successMessage = 'Регистрация прошла успешно!';
          setTimeout(() => this.router.navigate(['/lists']), 1000);
        },
        error: err => {
          console.error('Register failed', err);
          this.errorMessage = 'Не удалось зарегистрироваться';
        }
      });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
