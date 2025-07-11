import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '/home/formation/Documents/Codage/todo-app/src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule],
  template: `
    <h2>Inscription</h2>
    <form (submit)="register()">
      <input [value]="email()" (input)="email.set($any($event.target).value)" name="email" placeholder="Email" class="form-control mb-2" required>
      <input [value]="password()" (input)="password.set($any($event.target).value)" name="password" type="password" placeholder="Mot de passe" class="form-control mb-2" required>
      <button class="btn btn-success">S'inscrire</button>
    </form>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  register() {
    this.auth.register({ email: this.email(), password: this.password() }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert("Erreur d'inscription")
    });
  }
}
