import { Component, OnInit } from '@angular/core';
import { NhanVien } from '../interfaces/nhan-vien';
import { NhanVienService } from '../services/nhan-vien.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nhanviens',
  templateUrl: './nhanviens.component.html',
  styleUrls: ['./nhanviens.component.css'],
})
export class NhanviensComponent implements OnInit {
  searchTerm: string = ''; // Biến lưu trữ từ khóa tìm kiếm
  listNhanVien: NhanVien[] = []; // Danh sách nhân viên
  listNhanVien2: NhanVien[] = []; // Danh sách dự phòng cho việc lọc
  userInfo: any;

  constructor(private nhanVienService: NhanVienService, private auth: AuthService) {}

  ngOnInit(): void {
    // Lấy danh sách nhân viên từ service và gán cho listNhanVien
    this.nhanVienService.getListNhanVien().subscribe((nhanviens) => {
      this.listNhanVien = nhanviens;
      this.listNhanVien2 = [...this.listNhanVien]; // Sao chép danh sách nhân viên để sử dụng cho việc lọc
    });
  }

  daDangNhap() {
    const loggedIn = this.auth.daDangNhap();
    if (loggedIn) {
      const userInfoString = localStorage.getItem('user_info');
      if (userInfoString) {
        this.userInfo = JSON.parse(userInfoString);
      }
    }
    return loggedIn;
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

  // Hàm xóa nhân viên
  deleteNhanVien(id: number): void {
    if (id !== undefined) {
      // Kiểm tra vai trò người dùng
      if (this.userInfo?.role === 0) {
        if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
          // Gọi service để xóa nhân viên với id cụ thể
          this.nhanVienService.xoaNhanVien(id).subscribe(() => {
            // Sau khi xóa, cập nhật lại danh sách nhân viên bằng cách loại bỏ nhân viên có id tương ứng
            this.listNhanVien = this.listNhanVien.filter((nv) => nv.id !== id);
            this.listNhanVien2 = [...this.listNhanVien]; // Cập nhật danh sách dự phòng
          });
        }
      } else {
        // Người dùng không có quyền xóa, có thể hiển thị thông báo hoặc thực hiện hành động khác ở đây
        alert('Bạn không có quyền xóa nhân viên.');
      }
    }
  }
}
