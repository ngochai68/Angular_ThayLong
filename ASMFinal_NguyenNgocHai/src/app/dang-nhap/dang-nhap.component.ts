// Import các module và thư viện cần thiết
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.css'],
})
export class DangNhapComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginFailed = false; // Biến này sẽ đặt thành true khi có lỗi đăng nhập

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    // Khởi tạo FormGroup để quản lý form đăng nhập với các trường username và password
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // Phương thức xử lý sự kiện khi người dùng bấm nút đăng nhập
  xulyDN() {
    this.submitted = true;

    // Kiểm tra nếu form đăng nhập hợp lệ
    if (this.loginForm.valid) {
      const data = this.loginForm.value;

      // Gọi phương thức login từ AuthService để gửi yêu cầu đăng nhập
      this.auth.login(data.username, data.password).subscribe(
        (res) => {
          // Xử lý kết quả thành công khi đăng nhập
          const d = JSON.parse(res);
          console.log('Đăng nhập thành công', res);
          const expiresAt = moment().add(d.expiresIn, 'second');
          localStorage.setItem('id_token', d.idToken);
          localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

          // Lưu userInfo vào localStorage
          localStorage.setItem('user_info', JSON.stringify(d.userInfo));

          this.router.navigateByUrl('/');
        },
        (error) => {
          // Xử lý lỗi đăng nhập
          console.log('Oops', error);
          this.loginFailed = true; // Đặt loginFailed thành true khi có lỗi đăng nhập
          this.router.navigateByUrl('/dangnhap');
        }
      );
    }
  }
}
