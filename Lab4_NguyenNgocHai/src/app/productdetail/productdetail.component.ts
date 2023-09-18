import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanPhamService } from '../san-pham.service';
import { ISanpham } from '../isanpham';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spService: SanPhamService
  ) {}
  idSP: number = Number(this.route.snapshot.params['id']);
  sp = <ISanpham>{};
  ngOnInit(): void {
    if (this.idSP < 0) return;
    let kq = this.spService.getMotSanPham(this.idSP);
    if (kq == null) {
      this.sp = {} as ISanpham;
    } else {
      this.sp = kq as ISanpham;
    }
  }
}
