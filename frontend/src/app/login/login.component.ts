// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username.trim() || !this.password) {
      this.errorMessage = 'Введите имя пользователя и пароль';
      return;
    }

    this.auth.login(this.username, this.password)
      .subscribe({
        next: () => {
          this.successMessage = 'Вы успешно вошли в систему!';
          setTimeout(() => this.router.navigate(['/lists']), 1000);
        },
        error: () => {
          this.errorMessage = 'Неверное имя пользователя или пароль';
        }
      });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
