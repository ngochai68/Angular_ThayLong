import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css'],
})
export class AddStaffComponent implements OnInit {
  staffForm: FormGroup; // FormGroup để quản lý dữ liệu nhập trong form
  submitted = false; // Biến kiểm tra xem form đã được nộp chưa

  constructor(private fb: FormBuilder, private staffService: StaffService, private router: Router) {
    // Khởi tạo FormGroup và đặt trạng thái ban đầu
    this.staffForm = this.fb.group({
      lastName: ['', Validators.required], // Trường họ (bắt buộc)
      firstName: ['', Validators.required], // Trường tên (bắt buộc)
      dateOfBirth: ['', Validators.required], // Trường ngày sinh (bắt buộc)
      gender: [true, Validators.required], // Trường giới tính mặc định là true (bắt buộc)
      area: ['Bắc', Validators.required], // Trường khu vực mặc định là 'Bắc' (bắt buộộc)
    });
  }

  ngOnInit() {}

  addStaff() {
    this.submitted = true;

    if (this.staffForm.valid) {
      const staff = this.staffForm.value;
      // Gọi service để thêm thông tin nhân viên và sau đó chuyển hướng đến trang danh sách nhân viên
      this.staffService.addStaff(staff).subscribe(() => {
        this.router.navigate(['/staffs']);
      });
    }
  }
}
