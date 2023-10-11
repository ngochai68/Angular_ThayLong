import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DuAn } from './du-an';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuAnService {
  private duAnUrl = 'http://localhost:3000/duans'; // Đặt URL json-server của bạn ở đây

  constructor(private http: HttpClient) { }

  getDuAnList(): Observable<DuAn[]> {
    return this.http.get<DuAn[]>(this.duAnUrl);
  }

  getDuAn(id: number): Observable<DuAn> {
    const url = `${this.duAnUrl}/${id}`;
    return this.http.get<DuAn>(url);
  }

  addDuAn(duAn: DuAn): Observable<DuAn> {
    return this.http.post<DuAn>(this.duAnUrl, duAn);
  }

  updateDuAn(duAn: DuAn): Observable<DuAn> {
    const url = `${this.duAnUrl}/${duAn.id}`;
    return this.http.put<DuAn>(url, duAn);
  }

  deleteDuAn(id: number): Observable<void> {
    const url = `${this.duAnUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
