import { Component, OnInit } from '@angular/core';
import { DuAn } from '../du-an';

@Component({
  selector: 'app-duan-list',
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css'],
})
export class DuanListComponent implements OnInit {
  searchTerm: string = '';
  listDuAn: DuAn[] = [
    {
      id: 1,
      tenDuAn: 'Quản lý trại heo',
      ngayStart: '2022-03-01',
      tien: 67000000,
      leader: 1,
      thanhvien: [1, 3, 4],
    },
    {
      id: 2,
      tenDuAn: 'Cây xanh công viên',
      ngayStart: '2022-04-02',
      tien: 98500000,
      leader: 1,
      thanhvien: [1, 3, 4],
    },
    {
      id: 3,
      tenDuAn: 'Website Văn hóa Việt',
      ngayStart: '2022-04-15',
      tien: 35000000,
      leader: 2,
      thanhvien: [2, 4],
    },
    {
      id: 4,
      tenDuAn: 'Website Du lịch Bụi',
      ngayStart: '2022-04-21',
      tien: 75500000,
      leader: 2,
      thanhvien: [2, 4],
    },
    {
      id: 5,
      tenDuAn: 'Quản lý nhà thuốc Vĩnh An',
      ngayStart: '2022-05-2',
      tien: 97000000,
      leader: 3,
      thanhvien: [3, 4],
    },
    {
      id: 6,
      tenDuAn: 'Chăm sóc thú cưng',
      ngayStart: '2022-02-11',
      tien: 18000000,
      leader: 3,
      thanhvien: [3, 4],
    },
  ];

  constructor() {}
  listDuAn2: DuAn[] = [];

  ngOnInit(): void {
    this.listDuAn2 = this.listDuAn;
  }

  

  filteredDuAn() {
    const keyword = this.searchTerm.toLowerCase();
    this.listDuAn = this.listDuAn2.filter((p) =>
      p.tenDuAn.toLowerCase().includes(keyword)
    );
  }
}
