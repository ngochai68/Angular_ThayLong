import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NhanVienService } from '../nhan-vien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nv-them',
  templateUrl: './nv-them.component.html',
  styleUrls: ['./nv-them.component.css']
})
export class NvThemComponent {
  nhanVienForm: FormGroup;

  constructor(private fb: FormBuilder, private nhanVienService: NhanVienService, private router: Router) {
    this.nhanVienForm = this.fb.group({
      ho: ['', Validators.required],
      ten: ['', Validators.required],
      ngaysinh: ['', Validators.required],
      phai: [true, Validators.required],
      khuvuc: ['Bắc', Validators.required]
    });
  }

  themNhanVien() {
    if (this.nhanVienForm.valid) {
      // Chuyển giá trị 'true' hoặc 'false' thành kiểu boolean
      const phaiValue = this.nhanVienForm.get('phai')?.value === 'true' ? true : false;

      // Lấy giá trị từ form và thêm nhân viên vào danh sách
      const nhanVien = { ...this.nhanVienForm.value, phai: phaiValue };
      this.nhanVienService.themNhanVien(nhanVien);

      // Sau khi thêm thành công, xóa dữ liệu trong form
      this.nhanVienForm.reset({
        phai: true,
        khuvuc: 'Bắc'
      });

      this.router.navigate(['/nhanvien']);
    } else {
      // Đánh dấu tất cả các trường đã được chạm để hiển thị thông báo lỗi
      this.markFormGroupTouched(this.nhanVienForm);
    }


  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
