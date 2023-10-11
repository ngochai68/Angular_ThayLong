import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks'; // Đường dẫn đến JSON server

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl); // Sử dụng HttpClient để lấy dữ liệu từ JSON server
  }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, newTask); // Gửi POST request để thêm task mới
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url); // Lấy thông tin task dựa trên ID
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const url = `${this.baseUrl}/${updatedTask.id}`;
    return this.http.put<Task>(url, updatedTask); // Gửi PUT request để cập nhật task
  }

  deleteTask(taskId: number): Observable<void> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.delete<void>(url); // Gửi DELETE request để xóa task
  }
}
