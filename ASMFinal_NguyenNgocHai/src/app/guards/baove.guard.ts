// Import các module và thư viện cần thiết
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

// Định nghĩa guard 'baoveGuard'
export const baoveGuard: CanActivateFn = (route, state) => {
  // Lấy thông tin về thời gian hết hạn từ localStorage, nếu không có thì str sẽ là chuỗi rỗng
  const str = localStorage.getItem('expires_at') || '';

  // Kiểm tra nếu str là chuỗi rỗng, đây là trường hợp người dùng chưa đăng nhập hoặc thông tin đăng nhập đã hết hạn
  if (str == '') {
    return false; // Trả về 'false' để ngăn chặn người dùng truy cập vào trang bảo vệ
  }

  // Chuyển đổi thông tin thời gian hết hạn từ chuỗi JSON thành đối tượng thời gian
  const expiresAt = JSON.parse(str);

  // So sánh thời điểm hiện tại với thời gian hết hạn để kiểm tra xem người dùng đã đăng nhập và phiên làm việc còn hiệu lực hay không
  const daDangNhap = moment().isBefore(moment(expiresAt));

  // Trả về kết quả: 'true' nếu người dùng đã đăng nhập và phiên làm việc còn hiệu lực, 'false' nếu ngược lại
  return daDangNhap;
};
