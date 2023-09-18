import { Component, OnInit } from '@angular/core';
import { ISanpham } from '../isanpham';
import { SanPhamService } from '../san-pham.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-sua',
  templateUrl: './product-sua.component.html',
  styleUrls: ['./product-sua.component.css']
})
export class ProductSuaComponent implements OnInit {
  constructor(
    private spService:SanPhamService,
    private router:Router,
    private activeRoute:ActivatedRoute,
  ) {}
  idSP:number = Number(this.activeRoute.snapshot.params['id']);
  sp:ISanpham = <ISanpham>{};
  ngOnInit(): void {
    let kq = this.spService.getMotSanPham(this.idSP);
    this.sp = kq as ISanpham;
  }
  capnhatSP() {
    this.spService.capnhatSanPham(this.sp);
    this.router.navigate(['admin/sp']);
  }
}
