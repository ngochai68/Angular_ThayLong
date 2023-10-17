import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces/Project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectUrl = 'http://localhost:3000/projects'; // Đặt URL của json-server ở đây

  constructor(private http: HttpClient) {}

  // Lấy danh sách dự án từ API
  getProjectList(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  // Lấy thông tin dự án cụ thể dựa trên ID từ API
  getProject(id: number): Observable<Project> {
    const url = `${this.projectUrl}/${id}`;
    return this.http.get<Project>(url);
  }

  // Thêm một dự án mới bằng cách gửi POST request đến API
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project);
  }

  // Cập nhật thông tin dự án bằng cách gửi PUT request đến API
  updateProject(project: Project): Observable<Project> {
    const url = `${this.projectUrl}/${project.id}`;
    return this.http.put<Project>(url, project);
  }

  // Xóa một dự án dựa trên ID bằng cách gửi DELETE request đến API
  deleteProject(id: number): Observable<void> {
    const url = `${this.projectUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
