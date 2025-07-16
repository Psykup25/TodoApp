import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '/home/formation/Documents/Codage/todo-app/src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  email = signal('');
  password = signal('');
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  register() {
    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.auth.register({
      username: this.username(),
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: () => {
        this.successMessage.set('Inscription réussie ! Vous pouvez vous connecter.');
        this.loading.set(false);
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.errorMessage.set('Erreur lors de l\'inscription');
        this.loading.set(false);
      }
    });
  }
}
