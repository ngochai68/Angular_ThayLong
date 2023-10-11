import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';
import { NhanVien } from '../nhan-vien';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-them',
  templateUrl: './duan-them.component.html',
  styleUrls: ['./duan-them.component.css'],
})
export class DuanThemComponent {
  duAnForm: FormGroup;
  listNhanVien: NhanVien[] = [];
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private duAnService: DuAnService, private nhanVienService: NhanVienService, private router: Router) {
    // Khởi tạo FormGroup và đặt trạng thái ban đầu
    this.duAnForm = this.fb.group({
      tenDuAn: ['', [Validators.required]],
      ngayStart: ['', [Validators.required]],
      tien: [, [Validators.required, Validators.min(1)]],
      leader: [, [Validators.required]],
      thanhvien: [[], [Validators.required]],
    });

    // Lấy danh sách nhân viên từ service
    this.nhanVienService.getListNhanVien().subscribe((nhanviens) => {
      this.listNhanVien = nhanviens;
    });
  }

  themDuAn() {
    this.submitted = true; // Đánh dấu form đã được nộp

    // Kiểm tra và thiết lập biến trạng thái lỗi khi cần thiết
    if (this.duAnForm.invalid) {
      return; // Không xử lý nếu form không hợp lệ
    }

    const newDuAn = {
      tenDuAn: this.duAnForm.get('tenDuAn')?.value,
      ngayStart: this.duAnForm.get('ngayStart')?.value,
      tien: this.duAnForm.get('tien')?.value,
      leader: this.duAnForm.get('leader')?.value,
      thanhvien: this.duAnForm.get('thanhvien')?.value,
    };

    // Thêm dự án mới và xử lý sau khi thêm
    this.duAnService.addDuAn(newDuAn).subscribe(() => {
      this.router.navigate(['/duan']);
    });
  }
}
