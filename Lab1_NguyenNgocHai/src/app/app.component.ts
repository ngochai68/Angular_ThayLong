import { Component } from '@angular/core';
import { Nhakhoahoc } from './nhakhoahoc';
import { ISanpham } from './ISanpham';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bài Lab 1';
  student = {
    hoten: 'Nguyễn Ngọc Hải',
    phai: 0,
    ngaysinh: '2003-01-22',
    hinh: 'hinh1.jpg',
    diem: 7,
  };
  listNhaKH: Nhakhoahoc[] = [
    { id: 1, ho: 'Tạ Quang', ten: 'Bửu', sinh: 1910, mat: 1986 },
    { id: 2, ho: 'Nguyễn', ten: 'Văn A', sinh: 1995, mat: 2020 },
    { id: 3, ho: 'Trần', ten: 'Thị B', sinh: 1988, mat: 2010 },
    { id: 4, ho: 'Lê', ten: 'Đình C', sinh: 2000, mat: 2022 },
    { id: 5, ho: 'Phạm', ten: 'Văn D', sinh: 1992, mat: 2015 },
  ];
  show(codehtml: string) {
    var kq = document.querySelector('#ds') as HTMLElement;
    kq.innerHTML = codehtml;
  }
  render() {
    let codehtml = this.listNhaKH
      .map((nkh) => {
        const age = nkh.mat - nkh.sinh;

        const hoTen = `${nkh.ho.toUpperCase()} ${nkh.ten.toUpperCase()}`;

        return `
          <p>${nkh.id}. ${hoTen} (${nkh.sinh} - ${nkh.mat}, Tuổi: ${age})</p>
        `;
      })
      .join('');
    this.show(codehtml);
  }
  listSP: ISanpham[] = [
    {
      id: 1,
      tensp: 'Xiaomi Redmi Note 11',
      code: 'GDN-0011',
      giasp: 5490000,
      mota: 'Xiaomi Redmi Note 11 được xem như chiếc smartphone có giá tầm trung ấn tượng, với 1 cấu hình mạnh, cụm camera xịn sò, pin khỏe, sạc nhanh mà giá lại rất phải chăng.',
      urlImage:
        'https://cdn.tgdd.vn/Products/Images/42/245261/Xiaomi-redmi-note-11-blue-600x600.jpg',
      ngay: '2022-04-01',
      starRate: 3.2,
    },
    {
      id: 2,
      tensp: 'Phone 13 Pro Max 128GB ',
      code: 'GDN-0015',
      giasp: 33490000,
      mota: 'Máy thiết kế không mấy đột phá khi so với người tiền nhiệm, màn hình siêu đẹp, tần số quét nâng cấp lên 120 Hz mượt mà, cảm biến camera có kích thước lớn hơn',
      urlImage:
        'https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-xanh-la-thumb-600x600.jpg',
      ngay: '2022-04-02',
      starRate: 3.5,
    },
    {
      id: 3,
      tensp: 'Vivo Y33s',
      code: 'GDN-0018',
      giasp: 6990000,
      mota: 'Vivo Y33s thiết kế trẻ trung với màu đen tráng gương và xanh mộng mơ. Phiên bản màu đen được phủ lớp tráng gương sáng bóng, có thể trở thành chiếc gương tiện lợi',
      urlImage:
        'https://cdn.tgdd.vn/Products/Images/42/249102/Vivo-y33s-yellow-thumb-600x600.jpg',
      ngay: '2022-04-03',
      starRate: 3.5,
    },
    {
      id: 4,
      tensp: 'OPPO Reno7 Z 5G',
      code: 'GDN-0020',
      giasp: 10490000,
      mota: 'Sản phẩm có thiết kế OPPO Glow độc quyền, camera mang hiệu ứng như máy DSLR chuyên nghiệp cùng viền sáng kép, có cấu hình mạnh mẽ và đạt chứng nhận xếp hạng A về độ mượt.',
      urlImage:
        'https://cdn.tgdd.vn/Products/Images/42/271717/oppo-reno7-z-5g-thumb-1-1-600x600.jpg',
      ngay: '2022-04-04',
      starRate: 3.3,
    },
    {
      id: 5,
      tensp: 'Samsung Galaxy A03 3GB',
      code: 'GDN-0022',
      giasp: 2990000,
      mota: 'Là điện thoại Galaxy A đầu tiên của nhà Samsung trong năm 2022 tại VN. Sản phẩm có giá dễ tiếp cận, camera chính đến 48 MP, pin 5000 mAh thoải mái sử dụng cả ngày.',
      urlImage:
        'https://cdn.tgdd.vn/Products/Images/42/251856/samsung-galaxy-a03-xanh-thumb-600x600.jpg',
      ngay: '2022-04-02',
      starRate: 3.2,
    },
    {
      id: 6,
      tensp: 'Samsung Galaxy A52s 5G 128GB',
      code: 'GDN-0023',
      giasp: 10990000,
      mota: 'Điện thoại Galaxy A52s 5G là phiên bản nâng cấp của Galaxy A52 5G, với ngoại hình không đổi nhưng được nâng cấp đáng kể về thông số cấu hình bên trong.',
      urlImage:
        'https://cdn.tgdd.vn/Products/Images/42/247507/samsung-galaxy-a52s-5g-mint-600x600.jpg',
      ngay: '2022-04-03',
      starRate: 3.8,
    },
  ];
  showSP(codehtml: string) {
    var kq = document.querySelector('#listSP') as HTMLElement;
    kq.innerHTML = codehtml;
  }
  renderSP() {
    let codehtml = '<div class="row">';
    this.listSP.forEach((sp) => {
      codehtml += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${sp.urlImage}" class="card-img-top" alt="${sp.tensp}" style="max-width: 90%; margin: auto; padding: 10%">
            <div class="card-body">
              <h5 class="card-title">${sp.tensp}</h5>
              <p class="card-text">${sp.mota}</p>
              <p class="card-text">Mã sản phẩm: ${sp.code}</p>
              <p class="card-text">Giá sản phẩm: ${sp.giasp} VND</p>
              <p class="card-text">Ngày cập nhật: ${sp.ngay}</p>
              <p class="card-text">Đánh giá: ${sp.starRate} sao</p>
              <a href="#" class="btn btn-primary">Xem chi tiết</a>
            </div>
          </div>
        </div>
      `;
    });
    codehtml += '</div>';
    this.showSP(codehtml);
  }
}
