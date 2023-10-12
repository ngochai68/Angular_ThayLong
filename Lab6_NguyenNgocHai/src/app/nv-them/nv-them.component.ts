import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NhanVienService } from '../nhan-vien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nv-them',
  templateUrl: './nv-them.component.html',
  styleUrls: ['./nv-them.component.css'],
})
export class NvThemComponent {
  nhanVienForm: FormGroup; // FormGroup để quản lý dữ liệu nhập trong form
  submitted = false; // Biến kiểm tra xem form đã được nộp chưa

  constructor(private fb: FormBuilder, private nhanVienService: NhanVienService, private router: Router) {
    // Khởi tạo FormGroup và đặt trạng thái ban đầu
    this.nhanVienForm = this.fb.group({
      ho: ['', Validators.required], // Trường họ (bắt buộc)
      ten: ['', Validators.required], // Trường tên (bắt buộc)
      ngaysinh: ['', Validators.required], // Trường ngày sinh (bắt buộc)
      phai: [, Validators.required], // Trường giới tính (bắt buộc)
      khuvuc: ['', Validators.required], // Trường khu vực (bắt buộc)
    });
  }

  themNhanVien() {
    this.submitted = true;

    if (this.nhanVienForm.valid) {
      const nhanVien = this.nhanVienForm.value;
      // Gọi service để thêm thông tin nhân viên mới và sau đó chuyển hướng đến trang danh sách nhân viên
      this.nhanVienService.themNhanVien(nhanVien).subscribe(() => {
        this.router.navigate(['/nhanvien']);
      });
    }
  }
}
