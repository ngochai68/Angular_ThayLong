import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../interfaces/Staff';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private baseUrl = 'http://localhost:3000/staffs'; // Đường dẫn đến JSON server

  constructor(private http: HttpClient) {}

  getStaffList(): Observable<Staff[]> {
    // Lấy danh sách nhân viên từ API
    return this.http.get<Staff[]>(this.baseUrl);
  }

  getStaff(id: number): Observable<Staff> {
    const url = `${this.baseUrl}/${id}`;
    // Lấy thông tin của một nhân viên cụ thể dựa trên ID từ API
    return this.http.get<Staff>(url);
  }

  addStaff(staff: Staff): Observable<Staff> {
    // Thêm một nhân viên mới bằng cách gửi POST request đến API
    return this.http.post<Staff>(this.baseUrl, staff);
  }

  updateStaff(id: number, staff: Staff): Observable<Staff> {
    const url = `${this.baseUrl}/${id}`;
    // Cập nhật thông tin của một nhân viên bằng cách gửi PUT request đến API
    return this.http.put<Staff>(url, staff);
  }

  deleteStaff(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    // Xóa một nhân viên dựa trên ID bằng cách gửi DELETE request đến API
    return this.http.delete<void>(url);
  }
}
