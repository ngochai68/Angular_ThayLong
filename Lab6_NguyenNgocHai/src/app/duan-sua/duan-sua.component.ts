import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';
import { NhanVien } from '../nhan-vien';
import { DuAn } from '../du-an';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-duan-sua',
  templateUrl: './duan-sua.component.html',
  styleUrls: ['./duan-sua.component.css'],
})
export class DuanSuaComponent implements OnInit {
  duAnForm: FormGroup;
  listNhanVien: NhanVien[] = [];
  submitted: boolean = false;
  duAn!: DuAn;

  constructor(private fb: FormBuilder, private duAnService: DuAnService, private nhanVienService: NhanVienService, private route: ActivatedRoute, private router: Router) {
    // Khởi tạo FormGroup và đặt trạng thái ban đầu
    this.duAnForm = this.fb.group({
      id: [null],
      tenDuAn: ['', [Validators.required]],
      ngayStart: ['', [Validators.required]],
      tien: [, [Validators.required, Validators.min(1)]],
      leader: [, [Validators.required]],
      thanhvien: [[], [Validators.required]],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Lấy danh sách nhân viên từ service
    this.nhanVienService.getListNhanVien().subscribe((nhanviens) => {
      this.listNhanVien = nhanviens;
    });

    if (idParam !== null) {
      const id = +idParam;

      this.duAnService.getDuAn(id).subscribe((duAn) => {
        this.duAn = duAn;

        // Đổ dữ liệu dự án vào form
        this.duAnForm.setValue({
          id: duAn.id,
          tenDuAn: duAn.tenDuAn,
          ngayStart: duAn.ngayStart,
          tien: duAn.tien,
          leader: duAn.leader,
          thanhvien: duAn.thanhvien,
        });

        // Kiểm tra leader trong danh sách listNhanVien
        const leaderExists = this.listNhanVien.some((nhanvien) => nhanvien.id === duAn.leader);

        if (!leaderExists) {
          // Xóa giá trị leader khỏi form
          this.duAnForm.get('leader')?.setValue(null);
        }

        // Kiểm tra thanhvien trong danh sách listNhanVien
        const validThanhvien = duAn.thanhvien.filter((thanhvienId) => this.listNhanVien.some((nhanvien) => nhanvien.id === thanhvienId));

        if (validThanhvien.length !== duAn.thanhvien.length) {
          // Xử lý trường hợp có thành viên không tồn tại trong danh sách nhân viên

          // Cập nhật giá trị của thanhvien với danh sách thành viên hợp lệ
          this.duAnForm.get('thanhvien')?.setValue(validThanhvien);
        }
      });
    } else {
      // Xử lý trường hợp 'id' không tồn tại hoặc có giá trị 'null'
    }
  }

  suaDuAn() {
    this.submitted = true; // Đánh dấu form đã được nộp

    // Kiểm tra và thiết lập biến trạng thái lỗi khi cần thiết
    if (this.duAnForm.invalid) {
      return; // Không xử lý nếu form không hợp lệ
    }

    const updatedDuAn = {
      id: this.duAnForm.get('id')?.value,
      tenDuAn: this.duAnForm.get('tenDuAn')?.value,
      ngayStart: this.duAnForm.get('ngayStart')?.value,
      tien: this.duAnForm.get('tien')?.value,
      leader: this.duAnForm.get('leader')?.value,
      thanhvien: this.duAnForm.get('thanhvien')?.value,
    };

    // Cập nhật dự án và xử lý sau khi cập nhật
    this.duAnService.updateDuAn(updatedDuAn).subscribe(() => {
      this.router.navigate(['/duan']);
    });
  }
}
