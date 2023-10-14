  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthService } from '../auth.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
  })
  export class HomeComponent {
    userInfo: any;

    constructor(private router: Router, private auth: AuthService) {
      const userInfoString = localStorage.getItem('user_info');
      if (userInfoString) {
        this.userInfo = JSON.parse(userInfoString);
      }
      
    }

    navigateToLogin() {
      this.router.navigate(['/dangnhap']);
    }

    navigateToRegister() {
      this.router.navigate(['/register']);
    }

    isUserLoggedIn() {
      // Sử dụng logic kiểm tra đăng nhập từ AuthService hoặc bất kỳ cách nào bạn đã thực hiện
      // Trả về true nếu người dùng đã đăng nhập và false nếu chưa đăng nhập
      return this.auth.daDangNhap();
    }
  }
