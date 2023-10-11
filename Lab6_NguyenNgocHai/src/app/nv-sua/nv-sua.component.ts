import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVienService } from '../nhan-vien.service';

@Component({
  selector: 'app-nv-sua',
  templateUrl: './nv-sua.component.html',
  styleUrls: ['./nv-sua.component.css'],
})
export class NvSuaComponent implements OnInit {
  nhanVienForm: FormGroup;
  nhanVienId: number = 0;

  constructor(private fb: FormBuilder, private nhanVienService: NhanVienService, private route: ActivatedRoute, private router: Router) {
    this.nhanVienForm = this.fb.group({
      ho: ['', Validators.required],
      ten: ['', Validators.required],
      ngaysinh: ['', Validators.required],
      phai: [true, Validators.required],
      khuvuc: ['Bắc', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.nhanVienId = +params['id'];
      this.loadNhanVienData();
    });
  }

  loadNhanVienData() {
    this.nhanVienService.getNhanVien(this.nhanVienId).subscribe((nhanVien) => {
      if (nhanVien) {
        this.nhanVienForm.patchValue(nhanVien);
  
        const ngaysinh = new Date(nhanVien.ngaysinh);
        this.nhanVienForm.get('ngaysinh')?.setValue(ngaysinh.toISOString().substring(0, 10));
      } else {
        // Xử lý trường hợp nhân viên không tồn tại
        this.router.navigate(['/not-found']);
      }
    });
  }
  

  suaNhanVien() {
    if (this.nhanVienForm.valid) {
      const nhanVien = this.nhanVienForm.value;

      nhanVien.id = this.nhanVienId;

      this.nhanVienService.suaNhanVien(this.nhanVienId, nhanVien);
      this.router.navigate(['/nhanvien']); // Điều hướng đến danh sách nhân viên sau khi cập nhật
    } else {
      this.markFormGroupTouched(this.nhanVienForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
