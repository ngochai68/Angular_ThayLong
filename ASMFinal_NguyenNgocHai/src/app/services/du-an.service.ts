import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DuAn } from '../interfaces/du-an';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuAnService {
  private duAnUrl = 'http://localhost:3000/duans'; // Đặt URL json-server của bạn ở đây

  constructor(private http: HttpClient) { }

  getDuAnList(): Observable<DuAn[]> {
    // Lấy danh sách dự án từ API
    return this.http.get<DuAn[]>(this.duAnUrl);
  }

  getDuAn(id: number): Observable<DuAn> {
    const url = `${this.duAnUrl}/${id}`;
    // Lấy dự án cụ thể dựa trên ID từ API
    return this.http.get<DuAn>(url);
  }

  addDuAn(duAn: DuAn): Observable<DuAn> {
    // Thêm một dự án mới bằng cách gửi POST request đến API
    return this.http.post<DuAn>(this.duAnUrl, duAn);
  }

  updateDuAn(duAn: DuAn): Observable<DuAn> {
    const url = `${this.duAnUrl}/${duAn.id}`;
    // Cập nhật thông tin dự án bằng cách gửi PUT request đến API
    return this.http.put<DuAn>(url, duAn);
  }

  deleteDuAn(id: number): Observable<void> {
    const url = `${this.duAnUrl}/${id}`;
    // Xóa một dự án dựa trên ID bằng cách gửi DELETE request đến API
    return this.http.delete<void>(url);
  }
}
