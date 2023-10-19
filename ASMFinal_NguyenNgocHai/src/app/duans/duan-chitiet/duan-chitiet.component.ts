import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DuAnService } from 'src/app/services/du-an.service';
import { DuAn } from 'src/app/interfaces/du-an';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-duan-chitiet',
  templateUrl: './duan-chitiet.component.html',
  styleUrls: ['./duan-chitiet.component.css'],
})
export class DuanChitietComponent implements OnInit {
  duAn: DuAn | undefined; // Biến để lưu trữ dự án
  leaderName: string = ''; // Biến để lưu trữ tên của leader
  thanhVienNames: string[] = []; // Mảng để lưu trữ tên của các thành viên

  constructor(private route: ActivatedRoute, private duAnService: DuAnService, private nhanVienService: NhanVienService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const duAnId = Number(params.get('id'));

      // Lấy thông tin dự án từ service và xử lý lỗi 404 bằng catchError
      this.duAnService
        .getDuAn(duAnId)
        .pipe(
          catchError((error) => {
            return of(null); // Trả về giá trị null trong trường hợp lỗi 404
          })
        )
        .subscribe((duAn) => {
          if (duAn) {
            this.duAn = duAn;

            // Lấy thông tin tên của các thành viên dựa trên danh sách thành viên trong dự án
            const memberObservables = this.duAn.thanhvien.map((memberId) =>
              this.nhanVienService.getNhanVien(memberId).pipe(
                catchError((error) => {
                  return of({ ho: 'Không', ten: 'tìm thấy' }); // Trả về giá trị mặc định trong trường hợp lỗi 404
                })
              )
            );

            // Sử dụng forkJoin để thực hiện nhiều cuộc gọi đồng thời
            forkJoin(memberObservables).subscribe((names) => {
              this.thanhVienNames = names.map((name) => name.ho + ' ' + name.ten);
            });

            // Lấy thông tin tên của leader và xử lý lỗi 404 bằng catchError
            this.nhanVienService
              .getNhanVien(this.duAn.leader)
              .pipe(
                catchError((error) => {
                  return of({ ho: 'Không', ten: 'tìm thấy' }); // Trả về giá trị mặc định trong trường hợp lỗi 404
                })
              )
              .subscribe((leader) => {
                this.leaderName = leader.ho + ' ' + leader.ten;
              });
          }
        });
    });
  }
}
