import { Component } from '@angular/core';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service'; // Import service của nhân viên
import { NhanVien } from '../nhan-vien';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-them',
  templateUrl: './duan-them.component.html',
  styleUrls: ['./duan-them.component.css'],
})
export class DuanThemComponent {
  tenDuAn: string = '';
  ngayStart: string = '';
  tien: number = 0;
  leader: number = 1; // Mặc định chọn Leader 1
  thanhvien: number[] = []; // Không mặc định chọn Thành viên

  // Biến trạng thái lỗi
  tenDuAnError: boolean = false;
  ngayStartError: boolean = false;
  tienError: boolean = false;
  leaderError: boolean = false;
  thanhvienError: boolean = false;

  // Khai báo danh sách nhân viên
  listNhanVien: NhanVien[] = [];

  constructor(
    private duAnService: DuAnService,
    private nhanVienService: NhanVienService,
    private router: Router
  ) {
    // Lấy danh sách nhân viên từ service
    this.listNhanVien = this.nhanVienService.getListNhanVien();
  }

  themDuAn() {
    // Kiểm tra và thiết lập biến trạng thái lỗi khi cần thiết
    this.tenDuAnError = this.tenDuAn.trim() === '';
    this.ngayStartError = this.ngayStart.trim() === '';
    this.tienError = isNaN(this.tien);
    this.leaderError = this.leader === null;
    this.thanhvienError = this.thanhvien.length === 0;

    // Nếu có lỗi, không thực hiện thêm dự án và hiển thị thông báo lỗi
    if (
      this.tenDuAnError ||
      this.ngayStartError ||
      this.tienError ||
      this.leaderError ||
      this.thanhvienError
    ) {
      return;
    }

    if (typeof this.leader === 'string') {
      this.leader = parseInt(this.leader, 10);
    }

    const newDuAn = {
      id: this.duAnService.getDuAnList().length + 1,
      tenDuAn: this.tenDuAn,
      ngayStart: this.ngayStart,
      tien: this.tien,
      leader: this.leader,
      thanhvien: this.thanhvien,
    };

    this.duAnService.addDuAn(newDuAn);

    // Sau khi thêm dự án, xóa dữ liệu trong form
    this.tenDuAn = '';
    this.ngayStart = '';
    this.tien = 0;
    this.leader = 1;
    this.thanhvien = [];

    this.router.navigate(['/duan']);
  }
}
