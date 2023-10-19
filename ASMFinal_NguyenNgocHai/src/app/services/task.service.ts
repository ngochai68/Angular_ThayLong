import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // Lấy tất cả các task từ API bằng HTTP GET request
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  // Thêm một task mới bằng cách gửi HTTP POST request
  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, newTask);
  }

  // Lấy thông tin của một task cụ thể bằng HTTP GET request và ID của task
  getTask(id: number): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  // Cập nhật thông tin task bằng cách gửi HTTP PUT request
  updateTask(updatedTask: Task): Observable<Task> {
    const url = `${this.baseUrl}/${updatedTask.id}`;
    return this.http.put<Task>(url, updatedTask);
  }

  // Xóa một task dựa trên ID bằng cách gửi HTTP DELETE request
  deleteTask(taskId: number): Observable<void> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }
}
