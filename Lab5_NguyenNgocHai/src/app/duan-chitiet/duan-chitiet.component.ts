import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuAnService } from '../du-an.service';
import { DuAn } from '../du-an';
import { NhanVienService } from '../nhan-vien.service';

@Component({
  selector: 'app-duan-chitiet',
  templateUrl: './duan-chitiet.component.html',
  styleUrls: ['./duan-chitiet.component.css']
})
export class DuanChitietComponent implements OnInit {
  duAn: DuAn | undefined;
  leaderName: string = '';
  thanhVienNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private duAnService: DuAnService,
    private nhanVienService: NhanVienService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const duAnId = Number(params.get('id'));
      this.duAn = this.duAnService.getDuAn(duAnId);

      if (this.duAn) {
        this.thanhVienNames = this.duAn.thanhvien.map((memberId) =>
          this.nhanVienService.getTenNhanVien(memberId) || ''
        );

        this.leaderName = this.nhanVienService.getTenNhanVien(this.duAn.leader) || '';
      }
    });
  }
}
