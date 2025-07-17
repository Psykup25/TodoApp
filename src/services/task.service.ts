import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private api = 'https://todof.woopear.fr/api/v1/task';

  getTasks() {
    return this.http.get<{ data: any[] }>(this.api);
  }

  createTask(data: { label: string;}) {
    return this.http.post(this.api, data);
  }

  updateTask(id: string, data: { label: string }) {
    return this.http.put(`${this.api}/${id}/label/user`, data);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.api}/${id}/user`);
  }

  updateDone(id: string, data: { done: boolean }) {
    return this.http.put(`${this.api}/${id}/done/user`, data);
  }
}