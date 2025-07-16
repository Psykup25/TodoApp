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

  constructor() {
    if (!this.auth.getToken()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log(tasks);
      this.tasks.set(tasks);
    });
  }

  addTask() {
    this.taskService.createTask({
      title: this.newTitle(),
      content: this.newContent()
    }).subscribe({
      next: (task) => {
        this.tasks.set([...this.tasks(), task]);
        this.newTitle.set('');
        this.newContent.set('');
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}