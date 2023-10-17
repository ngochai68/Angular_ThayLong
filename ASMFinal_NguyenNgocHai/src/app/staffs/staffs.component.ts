import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staff } from '../interfaces/Staff';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css'],
})
export class StaffsComponent implements OnInit {
  staffs: Staff[] = [];

  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit(): void {
    this.getStaffList();
  }

  getStaffList(): void {
    this.staffService.getStaffList().subscribe((staffs) => {
      this.staffs = staffs;
    });
  }

  addStaff(): void {
    this.router.navigate(['/staffs/add']);
  }

  editStaff(id: number): void {
    // Điều hướng đến trang sửa staff với ID tương ứng
    this.router.navigate([`/staffs/edit/${id}`]);
  }

  deleteStaff(id: number): void {
    // Thực hiện hành động xóa staff có ID là id
    if (confirm('Bạn có chắc muốn xóa nhân viên này không?')) {
      this.staffService.deleteStaff(id).subscribe(() => {
        this.staffs = this.staffs.filter((staff) => staff.id !== id);
      });
    }
  }
}
