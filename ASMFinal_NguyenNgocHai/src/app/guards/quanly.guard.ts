import { CanActivateFn,  } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

export const quanlyGuard: CanActivateFn = (route, state) => {
  // Lấy thông tin về thời gian hết hạn từ localStorage, nếu không có thì str sẽ là chuỗi rỗng
  const str = localStorage.getItem('expires_at') || '';

  // Kiểm tra nếu str là chuỗi rỗng, đây là trường hợp người dùng chưa đăng nhập hoặc thông tin đăng nhập đã hết hạn
  if (str == '') {
    return false; // Ngăn chặn truy cập
  }

  // Chuyển đổi thông tin thời gian hết hạn từ chuỗi JSON thành đối tượng thời gian
  const expiresAt = JSON.parse(str);

  // So sánh thời điểm hiện tại với thời gian hết hạn để kiểm tra xem người dùng đã đăng nhập và phiên làm việc còn hiệu lực hay không
  const daDangNhap = moment().isBefore(moment(expiresAt));

  if (!daDangNhap) {
    return false; // Ngăn chặn truy cập
  }

  // Kiểm tra vai trò của người dùng, ví dụ: role 0 là quản lý
  const userInfoString = localStorage.getItem('user_info');
  if (!userInfoString) {
    return false; // Ngăn chặn truy cập
  }

  const userInfo = JSON.parse(userInfoString);

  if (userInfo.role === 0) {
    return true; // Cho phép quản lý truy cập
  } else {
    return false; // Ngăn chặn truy cập
  }
};
