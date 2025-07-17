import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '/home/formation/Documents/Codage/todo-app/src/services/task.service';
import { AuthService } from '/home/formation/Documents/Codage/todo-app/src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  private taskService = inject(TaskService);
  private auth = inject(AuthService);
  private router = inject(Router);

  tasks = signal<any[]>([]);
  newTitle = signal('');
  newContent = signal('');
  newLabel = signal('');
  editMode = signal(false);
  taskToEdit = signal<any | null>(null);
  editLabel = signal('');

  constructor() {
    console.log('Token utilisé:', this.auth.getToken());
    if (!this.auth.getToken()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        console.log('Exemple de tâche:', res.data[0]); 
        this.tasks.set(res.data);
      },
      error: err => {
        console.error('Erreur lors du chargement des tâches:', err);
      }
    });
  }

  addTask() {
    this.taskService.createTask({
      label: this.newLabel(),
    }).subscribe({
      next: () => {
        this.loadTasks();         
        this.newLabel.set('');
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => this.tasks.set(res.data),
      error: err => console.error('Erreur lors du chargement des tâches:', err)
    });
  }

  editTask(task: any) {
    this.editMode.set(true);
    this.taskToEdit.set(task);
    this.editLabel.set(task.label);
  }

  updateTask() {
    const task = this.taskToEdit();
    this.taskService.updateTask(task.id, { label: this.editLabel() }).subscribe({
      next: () => {
        this.loadTasks();
        this.editMode.set(false);
        this.taskToEdit.set(null);
        this.editLabel.set('');
      }
    });
  }

  cancelEdit() {
    this.editMode.set(false);
    this.taskToEdit.set(null);
    this.editLabel.set('');
  }

  toggleDone(task: any) {
    this.taskService.updateDone(task.id, { done: !task.done }).subscribe({
      next: () => this.loadTasks()
    });
  }
}