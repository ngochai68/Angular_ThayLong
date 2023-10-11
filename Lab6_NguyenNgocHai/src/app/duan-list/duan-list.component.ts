import { Component, OnInit } from '@angular/core';
import { DuAn } from '../du-an';
import { DuAnService } from '../du-an.service'; 

@Component({
  selector: 'app-duan-list',
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css'],
})
export class DuanListComponent implements OnInit {
  searchTerm: string = '';
  listDuAn: DuAn[] = [];
  listDuAn2: DuAn[] = [];

  constructor(private duAnService: DuAnService) {} 

  ngOnInit(): void {
    this.duAnService.getDuAnList().subscribe((duAnList) => {
      this.listDuAn = duAnList;
      this.listDuAn2 = [...this.listDuAn];
    });
  }

  filteredDuAn() {
    const keyword = this.searchTerm.toLowerCase();
    this.listDuAn = this.listDuAn2.filter((p) =>
      p.tenDuAn.toLowerCase().includes(keyword)
    );
  }

  deleteDuAn(id: number | undefined) {
    if (id !== undefined) {
      if (confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
        this.duAnService.deleteDuAn(id).subscribe(() => {
          // Sau khi xóa, cập nhật lại danh sách dự án
          this.listDuAn = this.listDuAn.filter(da => da.id !== id);
        });
      }
    }
  }
  
}
