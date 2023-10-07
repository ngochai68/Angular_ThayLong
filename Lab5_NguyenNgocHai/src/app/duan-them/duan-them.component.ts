import { Component } from '@angular/core';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service'; // Import service của nhân viên
import { NhanVien } from '../nhan-vien';

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

  // Khai báo danh sách nhân viên
  listNhanVien: NhanVien[] = [];

  constructor(
    private duAnService: DuAnService,
    private nhanVienService: NhanVienService
  ) {
    // Lấy danh sách nhân viên từ service
    this.listNhanVien = this.nhanVienService.getListNhanVien();
  }

  themDuAn() {
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
  }
}
