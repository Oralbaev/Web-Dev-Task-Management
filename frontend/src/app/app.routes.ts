import { Routes } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { RegisterComponent }   from './register/register.component';
import { TaskListComponent }   from './task-list/task-list.component';
import { AuthGuard }           from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'lists',     component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'lists/:id', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
