import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DuAnService } from 'src/app/services/du-an.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { NhanVien } from 'src/app/interfaces/nhan-vien';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-them',
  templateUrl: './duan-them.component.html',
  styleUrls: ['./duan-them.component.css'],
})
export class DuanThemComponent {
  duAnForm: FormGroup; // FormGroup cho biểu mẫu thêm dự án
  listNhanVien: NhanVien[] = []; // Danh sách nhân viên
  submitted: boolean = false; // Biến để theo dõi trạng thái đã nộp biểu mẫu hay chưa

  constructor(private fb: FormBuilder, private duAnService: DuAnService, private nhanVienService: NhanVienService, private router: Router) {
    // Khởi tạo FormGroup và đặt trạng thái ban đầu
    this.duAnForm = this.fb.group({
      tenDuAn: ['', [Validators.required]], // Trường tên dự án với yêu cầu bắt buộc
      ngayStart: ['', [Validators.required]], // Trường ngày bắt đầu với yêu cầu bắt buộc
      tien: [, [Validators.required, Validators.min(1)]], // Trường số tiền với yêu cầu bắt buộc và giá trị tối thiểu là 1
      leader: [, [Validators.required]], // Trường người chịu trách nhiệm (leader) với yêu cầu bắt buộc
      thanhvien: [[], [Validators.required]], // Trường danh sách thành viên với yêu cầu bắt buộc
    });

    // Lấy danh sách nhân viên từ service và gán vào biến listNhanVien
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

    // Tạo đối tượng mới dự án từ dữ liệu trong biểu mẫu
    const newDuAn = {
      tenDuAn: this.duAnForm.get('tenDuAn')?.value,
      ngayStart: this.duAnForm.get('ngayStart')?.value,
      tien: this.duAnForm.get('tien')?.value,
      leader: parseInt(this.duAnForm.get('leader')?.value, 10),
      thanhvien: this.duAnForm.get('thanhvien')?.value,
    };

    // Gọi service để thêm dự án mới và xử lý sau khi thêm
    this.duAnService.addDuAn(newDuAn).subscribe(() => {
      this.router.navigate(['/duan']); // Chuyển hướng sau khi thêm dự án thành công
    });
  }
}
