import { Component, OnInit } from '@angular/core';
import { NhanVien } from '../nhan-vien';
@Component({
  selector: 'app-nv-list',
  templateUrl: './nv-list.component.html',
  styleUrls: ['./nv-list.component.css'],
})
export class NvListComponent implements OnInit {
  searchTerm: string = '';
  listNhanVien: NhanVien[] = [
    {
      id: 1,
      ho: 'Nguyễn Bá',
      ten: 'Đạo',
      ngaysinh: '2001-1-3',
      phai: true,
      khuvuc: 'Bắc',
    },
    {
      id: 1,
      ho: 'Phạm Kỷ',
      ten: 'Luật',
      ngaysinh: '2001-5-6',
      phai: true,
      khuvuc: 'Bắc',
    },
    {
      id: 1,
      ho: 'Mai Thanh',
      ten: 'Toán',
      ngaysinh: '2002-6-15',
      phai: true,
      khuvuc: 'Nam',
    },
    {
      id: 1,
      ho: 'Cao Thị Chót',
      ten: 'Vót',
      ngaysinh: '2002-8-19',
      phai: false,
      khuvuc: 'Nam',
    },
    {
      id: 1,
      ho: 'Mai Phạt Sáu',
      ten: 'Ngàn',
      ngaysinh: '2001-2-28',
      phai: false,
      khuvuc: 'Trung',
    },
  ];
  constructor() {}
  listNhanVien2: NhanVien[] = [];

  ngOnInit(): void {
    this.listNhanVien2 = this.listNhanVien;
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
  
}
