//app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userInfo: any;

  constructor(private auth: AuthService, private router: Router) {}

  thoat() {
    this.auth.thoat();
    this.router.navigate(['/dangnhap']);
  }
  daDangNhap() {
    const loggedIn = this.auth.daDangNhap();
    if (loggedIn) {
      const userInfoString = localStorage.getItem('user_info');
      if (userInfoString) {
        this.userInfo = JSON.parse(userInfoString);
      }
    }
    return loggedIn;
  }
}
