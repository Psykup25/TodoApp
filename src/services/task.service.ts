import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private api = 'https://todof.woopear.fr/api/v1';

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  getTasks() {
    return this.http.get<any[]>(`${this.api}/tasks`, this.headers());
  }

  createTask(data: { title: string; content: string }) {
    return this.http.post(`${this.api}/tasks`, data, this.headers());
  }

  updateTask(id: number, data: { title: string; content: string }) {
    return this.http.put(`${this.api}/tasks/${id}`, data, this.headers());
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.api}/tasks/${id}`, this.headers());
  }
}