import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '/home/formation/Documents/Codage/todo-app/src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.html'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  loading = signal(false);
  errorMessage = signal('');

  login() {
    this.loading.set(true);
    this.errorMessage.set('');
    this.auth.login({ email: this.email(), password: this.password() }).subscribe({
      next: res => {
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/dashboard']);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Connexion échouée');
        this.loading.set(false);
      }
    });
  }
}
