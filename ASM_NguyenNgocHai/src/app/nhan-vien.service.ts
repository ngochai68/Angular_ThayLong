import { Injectable } from '@angular/core';
import { NhanVien } from './nhan-vien';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {
  private listNhanVien: NhanVien[] = [
    {
      id: 1,
      ho: 'Nguyễn Bá',
      ten: 'Đạo',
      ngaysinh: '2001-1-3',
      phai: true,
      khuvuc: 'Bắc',
    },
    {
      id: 2,
      ho: 'Phạm Kỷ',
      ten: 'Luật',
      ngaysinh: '2001-5-6',
      phai: true,
      khuvuc: 'Bắc',
    },
    {
      id: 3,
      ho: 'Mai Thanh',
      ten: 'Toán',
      ngaysinh: '2002-6-15',
      phai: true,
      khuvuc: 'Nam',
    },
    {
      id: 4,
      ho: 'Cao Thị Chót',
      ten: 'Vót',
      ngaysinh: '2002-8-19',
      phai: false,
      khuvuc: 'Nam',
    },
    {
      id: 5,
      ho: 'Mai Phạt Sáu',
      ten: 'Ngàn',
      ngaysinh: '2001-2-28',
      phai: false,
      khuvuc: 'Trung',
    },
  ];
  constructor() { }

  getListNhanVien(): NhanVien[] {
    return this.listNhanVien;
  }

  getNhanVien(id: number): NhanVien | undefined {
    return this.listNhanVien.find(nhanvien => nhanvien.id === id);
  }

  getTenNhanVien(id: number): string | undefined {
    const nhanvien = this.getNhanVien(id);
    return nhanvien ? `${nhanvien.ho} ${nhanvien.ten}` : undefined;
  }
}
