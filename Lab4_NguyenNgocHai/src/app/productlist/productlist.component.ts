import { Component, OnInit } from '@angular/core';
import { SanPhamService } from '../san-pham.service';
import { ISanpham } from '../isanpham';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  constructor( private spService:SanPhamService ) { }
  listSP:ISanpham[] = [];
  ngOnInit(): void {
    this.listSP = this.spService.getSanPham();
  }
}
