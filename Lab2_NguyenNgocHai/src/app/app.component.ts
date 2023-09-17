import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab2_NguyenNgocHai';
  searchQuery: string = ''; // Biến lưu giá trị tìm kiếm

  // Hàm này được gọi khi sự kiện searchEvent từ HeaderComponent được kích hoạt
  onSearch(searchTerm: string) {
    this.searchQuery = searchTerm; // Cập nhật biến tìm kiếm trong AppComponent
    // Xử lý dữ liệu tìm kiếm ở đây
    console.log(this.searchQuery);
    
  }
}
