import { Component, OnInit } from '@angular/core';
import { NhanVien } from '../nhan-vien';
import { NhanVienService } from '../nhan-vien.service';

@Component({
  selector: 'app-nv-list',
  templateUrl: './nv-list.component.html',
  styleUrls: ['./nv-list.component.css'],
})
export class NvListComponent implements OnInit {
  searchTerm: string = ''; // Biến lưu trữ từ khóa tìm kiếm
  listNhanVien: NhanVien[] = []; // Danh sách nhân viên
  listNhanVien2: NhanVien[] = []; // Danh sách dự phòng cho việc lọc

  constructor(private nhanVienService: NhanVienService) {}

  ngOnInit(): void {
    // Lấy danh sách nhân viên từ service và gán cho listNhanVien
    this.nhanVienService.getListNhanVien().subscribe((nhanviens) => {
      this.listNhanVien = nhanviens;
      this.listNhanVien2 = [...this.listNhanVien]; // Sao chép danh sách nhân viên để sử dụng cho việc lọc
    });
  }

  filteredNhanVien() {
    const keyword = this.searchTerm.toLowerCase();

    if (keyword === '') {
      this.listNhanVien = this.listNhanVien2; // Nếu từ khóa tìm kiếm rỗng, hiển thị lại toàn bộ danh sách
    } else {
      // Lọc danh sách nhân viên dựa trên từ khóa tìm kiếm
      this.listNhanVien = this.listNhanVien2.filter((p) => p.ten.toLowerCase().charAt(0) === keyword);
    }
  }

  deleteNhanVien(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      // Gọi service để xóa nhân viên và cập nhật danh sách
      this.nhanVienService.xoaNhanVien(id).subscribe(() => {
        this.listNhanVien = this.listNhanVien.filter((nv) => nv.id !== id); // Cập nhật danh sách sau khi xóa
        this.listNhanVien2 = [...this.listNhanVien]; // Cập nhật danh sách dự phòng
      });
    }
  }
}
