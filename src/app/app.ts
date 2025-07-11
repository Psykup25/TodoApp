import { Component, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '/home/formation/Documents/Codage/todo-app/src/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav class="navbar navbar-light bg-light px-3">
      <span class="navbar-brand">Todo App</span>
      <button class="btn btn-outline-danger" (click)="logout()" [hidden]="!isLoggedIn()">Déconnexion</button>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = computed(() => !!this.auth.getToken());

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}