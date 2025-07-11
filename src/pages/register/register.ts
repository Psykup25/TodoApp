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
    <form (submit)="register($event)">
      <input [value]="email()" (input)="email.set($any($event.target).value)" placeholder="Email" class="form-control mb-2" required>
      <input [value]="password()" (input)="password.set($any($event.target).value)" type="password" placeholder="Mot de passe" class="form-control mb-2" required>
      <input [value]="username()" (input)="username.set($any($event.target).value)" placeholder="Nom d'utilisateur" class="form-control mb-2" required>
      <button type="submit" class="btn btn-success">S'inscrire</button>
    </form>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  username = signal('');

  register(event: Event) {
    event.preventDefault();
    this.auth.register({
      email: this.email(),
      password: this.password(),
      username: this.username()
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        console.error(err);
        alert("Erreur d'inscription");
      }
    });
  }

}
