import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NhanVienService } from '../nhan-vien.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nv-sua',
  templateUrl: './nv-sua.component.html',
  styleUrls: ['./nv-sua.component.css'],
})
export class NvSuaComponent implements OnInit {
  nhanVienForm: FormGroup; // FormGroup để quản lý dữ liệu nhập trong form
  submitted = false; // Biến kiểm tra xem form đã được nộp chưa
  nhanVienId: number = 0; // Khởi tạo giá trị ban đầu cho nhanVienId

  constructor(private fb: FormBuilder, private nhanVienService: NhanVienService, private router: Router, private route: ActivatedRoute) {
    // Khởi tạo FormGroup và đặt trạng thái ban đầu
    this.nhanVienForm = this.fb.group({
      ho: ['', Validators.required], // Trường họ (bắt buộc)
      ten: ['', Validators.required], // Trường tên (bắt buộc)
      ngaysinh: ['', Validators.required], // Trường ngày sinh (bắt buộc)
      phai: [true, Validators.required], // Trường giới tính mặc định là true (bắt buộc)
      khuvuc: ['Bắc', Validators.required], // Trường khu vực mặc định là 'Bắc' (bắt buộc)
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.nhanVienId = +params['id']; // Lấy ID từ URL và gán cho nhanVienId
      this.nhanVienService.getNhanVien(this.nhanVienId).subscribe((nhanVien) => {
        // Đổ dữ liệu nhân viên từ service vào form để chỉnh sửa
        this.nhanVienForm.setValue({
          ho: nhanVien.ho,
          ten: nhanVien.ten,
          ngaysinh: nhanVien.ngaysinh,
          phai: nhanVien.phai,
          khuvuc: nhanVien.khuvuc,
        });
      });
    });
  }

  suaNhanVien() {
    this.submitted = true;

    if (this.nhanVienForm.valid) {
      const nhanVien = this.nhanVienForm.value;
      // Gọi service để cập nhật thông tin nhân viên và sau đó chuyển hướng đến trang danh sách nhân viên
      this.nhanVienService.suaNhanVien(this.nhanVienId, nhanVien).subscribe(() => {
        this.router.navigate(['/nhanvien']);
      });
    }
  }
}
