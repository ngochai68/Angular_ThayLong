// Import các module và thư viện cần thiết
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _http: HttpClient) {}

  // Phương thức để đăng nhập người dùng
  // Nhận username và password làm tham số, mặc định rỗng
  login(username: string = '', password: string = '') {
    const userInfo = { un: username, pw: password };

    // Tạo header chứa thông tin về dữ liệu gửi đi
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Sử dụng HttpClient để gửi yêu cầu POST đến URL 'http://localhost:3001/login'
    // với dữ liệu userInfo dưới dạng JSON và chờ đợi dữ liệu phản hồi dưới dạng văn bản (text)
    return this._http.post('http://localhost:3001/login', JSON.stringify(userInfo), { headers: headers, responseType: 'text' });
  }

  // Phương thức để đăng xuất người dùng bằng cách xóa các thông tin lưu trữ trong localStorage
  thoat() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
  }

  // Phương thức kiểm tra xem người dùng đã đăng nhập hay chưa
  public daDangNhap() {
    // Lấy thông tin về thời gian hết hạn từ localStorage
    const str = localStorage.getItem('expires_at') || '';

    // Nếu không có thông tin về thời gian hết hạn, người dùng chưa đăng nhập
    if (str == '') return false;

    // Chuyển đổi thông tin thời gian hết hạn từ chuỗi JSON thành đối tượng thời gian
    const expiresAt = JSON.parse(str);

    // So sánh thời điểm hiện tại với thời gian hết hạn
    return moment().isBefore(moment(expiresAt));
  }
}
