import { Routes } from '@angular/router';
import { LoginComponent } from '/home/formation/Documents/Codage/todo-app/src/pages/login/login';
import { RegisterComponent } from '/home/formation/Documents/Codage/todo-app/src/pages/register/register';
import { DashboardComponent } from '/home/formation/Documents/Codage/todo-app/src/pages/dashboard/dashboard';
import { authGuard } from '../services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
