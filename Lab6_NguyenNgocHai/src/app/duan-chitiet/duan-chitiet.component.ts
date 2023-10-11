import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuAnService } from '../du-an.service';
import { DuAn } from '../du-an';
import { NhanVienService } from '../nhan-vien.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

      this.duAnService.getDuAn(duAnId).pipe(
        catchError((error) => {
          return of(null); // Trả về giá trị null trong trường hợp lỗi 404
        })
      ).subscribe((duAn) => {
        if (duAn) {
          this.duAn = duAn;

          const memberObservables = this.duAn.thanhvien.map((memberId) =>
            this.nhanVienService.getNhanVien(memberId).pipe(
              catchError((error) => {
                return of({ ho: 'Không', ten: 'tìm thấy' }); // Trả về giá trị mặc định trong trường hợp lỗi 404
              })
            )
          );

          forkJoin(memberObservables).subscribe((names) => {
            this.thanhVienNames = names.map(name => name.ho + ' ' + name.ten);
          });

          this.nhanVienService.getNhanVien(this.duAn.leader).pipe(
            catchError((error) => {
              return of({ ho: 'Không', ten: 'tìm thấy' }); // Trả về giá trị mặc định trong trường hợp lỗi 404
            })
          ).subscribe((leader) => {
            this.leaderName = leader.ho + ' ' + leader.ten;
          });
        }
      });
    });
  }
}
