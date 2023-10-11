import { Component, OnInit } from '@angular/core';
import { NhanVien } from '../nhan-vien';
import { NhanVienService } from '../nhan-vien.service';

@Component({
  selector: 'app-nv-list',
  templateUrl: './nv-list.component.html',
  styleUrls: ['./nv-list.component.css'],
})
export class NvListComponent implements OnInit {
  searchTerm: string = '';
  listNhanVien: NhanVien[] = [];
  listNhanVien2: NhanVien[] = [];

  constructor(private nhanVienService: NhanVienService) {}

  ngOnInit(): void {
    this.nhanVienService.getListNhanVien().subscribe((nhanviens) => {
      this.listNhanVien = nhanviens;
      this.listNhanVien2 = [...this.listNhanVien];
    });
  }

  filteredNhanVien() {
    const keyword = this.searchTerm.toLowerCase();
    if (keyword === '') {
      this.listNhanVien = this.listNhanVien2;
    } else {
      this.listNhanVien = this.listNhanVien2.filter((p) =>
        p.ten.toLowerCase().charAt(0) === keyword
      );
    }
  }

  deleteNhanVien(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      this.nhanVienService.xoaNhanVien(id).subscribe(() => {
        this.listNhanVien = this.listNhanVien.filter((nv) => nv.id !== id);
        this.listNhanVien2 = [...this.listNhanVien];
      });
    }
  }
}
