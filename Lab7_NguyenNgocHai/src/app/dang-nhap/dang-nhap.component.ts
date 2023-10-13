// dang-nhap.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
  loginFailed = false; // Thêm biến loginFailed và đặt giá trị mặc định là false

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  xulyDN() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      console.log(data.username, data.password);
      this.auth.login(data.username, data.password).subscribe(
        (res) => {
          const d = JSON.parse(res);
          console.log('Đăng nhập thành công', res);
          const expiresAt = moment().add(d.expiresIn, 'second');
          localStorage.setItem('id_token', d.idToken);
          localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log('Oops', error);
          this.loginFailed = true; // Đặt loginFailed thành true khi có lỗi đăng nhập
          this.router.navigateByUrl('/dangnhap');
        }
      );
    }
  }
}
