import { Component, OnInit } from '@angular/core';
import { DuAn } from '../du-an';
import { DuAnService } from '../du-an.service';

@Component({
  selector: 'app-duan-list',
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css'],
})
export class DuanListComponent implements OnInit {
  searchTerm: string = ''; // Biến để lưu trữ giá trị từ ô tìm kiếm
  listDuAn: DuAn[] = []; // Mảng lưu trữ danh sách dự án
  listDuAn2: DuAn[] = []; // Mảng lưu trữ một bản sao của danh sách dự án

  constructor(private duAnService: DuAnService) {}

  ngOnInit(): void {
    // Khi component được khởi tạo, ta tải danh sách dự án từ service và lưu vào listDuAn
    this.duAnService.getDuAnList().subscribe((duAnList) => {
      this.listDuAn = duAnList;
      this.listDuAn2 = [...this.listDuAn]; // Tạo một bản sao của danh sách dự án
    });
  }

  // Hàm này được gọi khi người dùng thay đổi giá trị ô tìm kiếm
  filteredDuAn() {
    const keyword = this.searchTerm.toLowerCase(); // Chuyển giá trị từ ô tìm kiếm thành chữ thường

    // Sử dụng filter để lọc danh sách dự án theo từ khóa tìm kiếm
    this.listDuAn = this.listDuAn2.filter((duAn) =>
      duAn.tenDuAn.toLowerCase().includes(keyword)
    );
  }

  // Hàm xóa dự án
  deleteDuAn(id: number | undefined) {
    if (id !== undefined) {
      // Hiển thị xác nhận trước khi xóa dự án
      if (confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
        // Gọi service để xóa dự án với id cụ thể
        this.duAnService.deleteDuAn(id).subscribe(() => {
          // Sau khi xóa, cập nhật lại danh sách dự án bằng cách loại bỏ dự án có id tương ứng
          this.listDuAn = this.listDuAn.filter((da) => da.id !== id);
        });
      }
    }
  }
}
