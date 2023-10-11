import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NhanVien } from './nhan-vien';
import { map } from 'rxjs/operators'; // Import 'map' from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class NhanVienService {
  private baseUrl = 'http://localhost:3000/nhanviens'; // Đường dẫn đến JSON server

  constructor(private http: HttpClient) {}

  getListNhanVien(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.baseUrl);
  }

  getNhanVien(id: number): Observable<NhanVien> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<NhanVien>(url);
  }

  themNhanVien(nhanVien: NhanVien): Observable<NhanVien> {
    return this.http.post<NhanVien>(this.baseUrl, nhanVien);
  }

  suaNhanVien(id: number, nhanVien: NhanVien): Observable<NhanVien> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<NhanVien>(url, nhanVien);
  }

  xoaNhanVien(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
