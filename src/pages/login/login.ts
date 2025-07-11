import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '/home/formation/Documents/Codage/todo-app/src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule],
  template: `
    <h2>Connexion</h2>
    <form (submit)="login()">
      <input [value]="email()" (input)="email.set($any($event.target).value)" name="email" placeholder="Email" class="form-control mb-2" required>
      <input [value]="password()" (input)="password.set($any($event.target).value)" name="password" type="password" placeholder="Mot de passe" class="form-control mb-2" required>
      <button class="btn btn-primary">Se connecter</button>
    </form>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  login() {
    this.auth.login({ email: this.email(), password: this.password() }).subscribe({
      next: res => {
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Connexion échouée')
    });
  }
}
