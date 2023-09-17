import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm: string = ''; // Biến lưu giá trị nhập vào ô tìm kiếm
  @Output() searchEvent = new EventEmitter<string>(); // Sự kiện đầu ra

  // Hàm này được gọi khi người dùng thực hiện tìm kiếm
  onSearch() {
    this.searchEvent.emit(this.searchTerm); // Truyền giá trị ra ngoài
  }
}
