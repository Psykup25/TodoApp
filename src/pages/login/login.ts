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

  constructor() {
    console.log('LoginComponent chargé');
  }

  login() {
    console.log('Méthode login appelée');
    this.loading.set(true);
    this.errorMessage.set('');
    this.auth.login({ email: this.email(), password: this.password() }).subscribe({
      next: res => {
        console.log('Réponse login:', res); 
        console.log('Token à sauvegarder:', res.data?.token);
        this.auth.saveToken(res.data?.token);
        this.router.navigate(['/dashboard']).then(() => window.location.reload());
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Connexion échouée');
        this.loading.set(false);
      }
    });
  }
}
