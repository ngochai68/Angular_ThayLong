import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NhanVien } from '../interfaces/nhan-vien';

@Injectable({
  providedIn: 'root',
})
export class NhanVienService {
  private baseUrl = 'http://localhost:3000/nhanviens'; // Đường dẫn đến JSON server

  constructor(private http: HttpClient) {}

  getListNhanVien(): Observable<NhanVien[]> {
    // Lấy danh sách nhân viên từ API
    return this.http.get<NhanVien[]>(this.baseUrl);
  }

  getNhanVien(id: number): Observable<NhanVien> {
    const url = `${this.baseUrl}/${id}`;
    // Lấy thông tin của một nhân viên cụ thể dựa trên ID từ API
    return this.http.get<NhanVien>(url);
  }

  themNhanVien(nhanVien: NhanVien): Observable<NhanVien> {
    // Thêm một nhân viên mới bằng cách gửi POST request đến API
    return this.http.post<NhanVien>(this.baseUrl, nhanVien);
  }

  suaNhanVien(id: number, nhanVien: NhanVien): Observable<NhanVien> {
    const url = `${this.baseUrl}/${id}`;
    // Cập nhật thông tin của một nhân viên bằng cách gửi PUT request đến API
    return this.http.put<NhanVien>(url, nhanVien);
  }

  xoaNhanVien(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    // Xóa một nhân viên dựa trên ID bằng cách gửi DELETE request đến API
    return this.http.delete<void>(url);
  }
}
