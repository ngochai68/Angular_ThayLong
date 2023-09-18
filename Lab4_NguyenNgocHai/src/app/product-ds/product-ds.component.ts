import { Component, OnInit } from '@angular/core';
import { ISanpham } from '../isanpham';
import { SanPhamService } from '../san-pham.service';

@Component({
  selector: 'app-product-ds',
  templateUrl: './product-ds.component.html',
  styleUrls: ['./product-ds.component.css'],
})
export class ProductDsComponent implements OnInit {
  constructor(private spService: SanPhamService) {}
  listSP: ISanpham[] = [];
  ngOnInit(): void {
    this.listSP = this.spService.getSanPham();
  }
  xoaSP(id:number=0) {
    this.spService.xoaSanPham(id);
    return false;
  }
}
