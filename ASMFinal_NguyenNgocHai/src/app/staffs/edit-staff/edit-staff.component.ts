import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css'],
})
export class EditStaffComponent implements OnInit {
  staffForm: FormGroup; // FormGroup để quản lý dữ liệu nhập trong form
  submitted = false; // Biến kiểm tra xem form đã được nộp chưa
  staffId: number = 0; // Khởi tạo giá trị ban đầu cho staffId

  constructor(private fb: FormBuilder, private staffService: StaffService, private router: Router, private route: ActivatedRoute) {
    // Khởi tạo FormGroup và đặt trạng thái ban đầu
    this.staffForm = this.fb.group({
      lastName: ['', Validators.required], // Trường họ (bắt buộc)
      firstName: ['', Validators.required], // Trường tên (bắt buộc)
      dateOfBirth: ['', Validators.required], // Trường ngày sinh (bắt buộc)
      gender: [true, Validators.required], // Trường giới tính mặc định là true (bắt buộc)
      area: ['Bắc', Validators.required], // Trường khu vực mặc định là 'Bắc' (bắt buộc)
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.staffId = +params['id']; // Lấy ID từ URL và gán cho staffId
      this.staffService.getStaff(this.staffId).subscribe((staff) => {
        // Đổ dữ liệu nhân viên từ service vào form để chỉnh sửa
        this.staffForm.setValue({
          lastName: staff.lastName,
          firstName: staff.firstName,
          dateOfBirth: staff.dateOfBirth,
          gender: staff.gender,
          area: staff.area,
        });
      });
    });
  }

  editStaff() {
    this.submitted = true;

    if (this.staffForm.valid) {
      const staff = this.staffForm.value;

      // Xóa giá trị gender và area khỏi đối tượng staff nếu chúng không hợp lệ (null hoặc không cần thiết)
      if (staff.gender === '' || staff.gender === undefined) {
        staff.gender = null;
      }

      if (staff.area === '' || staff.area === undefined) {
        staff.area = null;
      }

      // Gọi service để cập nhật thông tin nhân viên và sau đó chuyển hướng đến trang danh sách nhân viên
      this.staffService.updateStaff(this.staffId, staff).subscribe(() => {
        this.router.navigate(['/staffs']);
      });
    }
  }
}
