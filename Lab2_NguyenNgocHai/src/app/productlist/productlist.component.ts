import { Component, OnInit } from '@angular/core';
import { ISanpham } from '../ISanpham';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  products: ISanpham[] = [
    {
      id: 1,
      tensp: 'Leaf Rake',
      code: 'GDN-0011',
      giasp: 19.95,
      mota: 'Leaf rake with 48-inch wooden handle',
      urlImage:
        'https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg',
      ngay: 'March 19, 2016',
      starRate: 3.2,
    },
    {
      id: 2,
      tensp: 'Garden Cart',
      code: 'GDN-0023',
      giasp: 32.99,
      mota: '15 gallon capacity rolling garden cart',
      urlImage:
        'https://i.pinimg.com/736x/eb/58/cc/eb58cc5cfecde2911c1bd9bb8df69ce7.jpg',
      ngay: 'March 18, 2016',
      starRate: 4.2,
    },
    {
      id: 5,
      tensp: 'Hammer',
      code: 'TBX-0048',
      giasp: 8.9,
      mota: 'Curved claw steel hammer',
      urlImage:
        'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg',
      ngay: 'May 21, 2016',
      starRate: 3.8,
    },
    {
      id: 8,
      tensp: 'Saw',
      code: 'TBX-0022',
      giasp: 11.55,
      mota: '15-inch steel blade hand saw',
      urlImage:
        'https://tophinhanhdep.com/wp-content/uploads/2021/10/720x1480-Wallpapers.jpg',
      ngay: 'May 15, 2016',
      starRate: 3.7,
    },
    {
      id: 10,
      tensp: 'Video Game Controller',
      code: 'GMG-0042',
      giasp: 35.95,
      mota: 'Standard two-button video game controller',
      urlImage:
        'https://webqi.s3-ap-southeast-1.amazonaws.com/UploadImages/haiphong/thmyduc1/mienthmd/2022_5/hinh-nen-dep_185202221.jpg?w=400',
      ngay: 'October 15, 2015',
      starRate: 4.6,
    },
  ];

  constructor() {}
  listProduct: ISanpham[] = [];

  ngOnInit(): void {
    this.listProduct = this.products;
  }

  locSP() {
    const keyword = this.tukhoa.toLowerCase();
    this.products = this.listProduct.filter((p) =>
      p.tensp.toLowerCase().includes(keyword)
    );
  }

  tukhoa: string = '';

  exchangeRate: number = 23000;

  calculateVndValue(usdValue: number) {
    return usdValue * this.exchangeRate;
  }

  showImages: boolean = true;

  toggleImageVisibility() {
    this.showImages = !this.showImages;
  }

  searchKeyword: string = '';

  onSearchKeywordChange(keyword: string) {
    this.searchKeyword = keyword;
    this.locSP();
  }
}
