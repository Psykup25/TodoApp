import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '/home/formation/Documents/Codage/todo-app/src/services/task.service';
import { AuthService } from '/home/formation/Documents/Codage/todo-app/src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <h2>Mes tâches</h2>
    <form (submit)="addTask()" class="mb-4">
      <input [value]="title()" (input)="title.set($any($event.target).value)" name="title" placeholder="Titre" class="form-control mb-2" required>
      <textarea [value]="content()" (input)="content.set($any($event.target).value)" name="content" placeholder="Contenu" class="form-control mb-2" required></textarea>
      <button class="btn btn-success">Ajouter</button>
    </form>

    <ul class="list-group">
      <li *ngFor="let task of tasks()" class="list-group-item">
        <h5>{{ task.title }}</h5>
        <p>{{ task.content }}</p>
        <button class="btn btn-danger btn-sm" (click)="deleteTask(task.id)">Supprimer</button>
      </li>
    </ul>
  `
})
export class DashboardComponent {
  private taskService = inject(TaskService);
  private auth = inject(AuthService);
  private router = inject(Router);

  title = signal('');
  content = signal('');
  tasks = signal<any[]>([]);

  constructor() {
    effect(() => {
      if (!this.auth.getToken()) {
        this.router.navigate(['/login']);
      } else {
        this.loadTasks();
      }
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => this.tasks.set(res));
  }

  addTask() {
    this.taskService.createTask({ title: this.title(), content: this.content() }).subscribe(() => {
      this.title.set('');
      this.content.set('');
      this.loadTasks();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}