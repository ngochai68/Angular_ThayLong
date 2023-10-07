import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';
import { NhanVien } from '../nhan-vien';
import { DuAn } from '../du-an';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-sua',
  templateUrl: './duan-sua.component.html',
  styleUrls: ['./duan-sua.component.css'],
})
export class DuanSuaComponent implements OnInit {
  id: number = 0;
  tenDuAn: string = '';
  ngayStart: string = '';
  tien: number = 0;
  leader: number = 1;
  thanhvien: number[] = [];

  listNhanVien: NhanVien[] = [];
  duAn: DuAn | undefined;

  constructor(
    private duAnService: DuAnService,
    private nhanVienService: NhanVienService,
    private route: ActivatedRoute,//Thêm ActivatedRoute
    private router: Router 
  ) {}

  ngOnInit(): void {
    // Lấy danh sách nhân viên từ service
    this.listNhanVien = this.nhanVienService.getListNhanVien();

    // Lấy id từ URL và lấy thông tin dự án từ DuAnService
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.duAn = this.duAnService.getDuAn(id);

      // Gán thông tin dự án cho các biến
      if (this.duAn) {
        this.id = this.duAn.id;
        this.tenDuAn = this.duAn.tenDuAn;
        this.ngayStart = this.duAn.ngayStart;
        this.tien = this.duAn.tien;
        this.leader = this.duAn.leader;
        this.thanhvien = this.duAn.thanhvien;
      }
    });
  }

  suaDuAn() {
    if (typeof this.leader === 'string') {
      this.leader = parseInt(this.leader, 10);
    }

    // Kiểm tra xem this.duAn có giá trị không null hoặc undefined
    if (this.duAn) {
      this.duAn.tenDuAn = this.tenDuAn;
      this.duAn.ngayStart = this.ngayStart;
      this.duAn.tien = this.tien;
      this.duAn.leader = this.leader;
      this.duAn.thanhvien = this.thanhvien;

      // Lưu dự án sau khi sửa
      this.duAnService.updateDuAn(this.duAn);

      // Sau khi sửa dự án, xóa dữ liệu trong form
      this.id = 0;
      this.tenDuAn = '';
      this.ngayStart = '';
      this.tien = 0;
      this.leader = 1;
      this.thanhvien = [];
    }

    this.router.navigate(['/duan']);
  }
}
