import { Component, OnInit } from '@angular/core';
import { Task } from '../task'; // Import mô hình dữ liệu Task
import { TaskService } from '../task.service'; // Import service cho Task
import { DuAnService } from '../du-an.service'; // Import service cho Dự án
import { NhanVienService } from '../nhan-vien.service'; // Import service cho Nhân viên
import { forkJoin } from 'rxjs'; // Import operator forkJoin để xử lý nhiều Observable

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  searchTerm: string = ''; // Biến lưu trữ từ khóa tìm kiếm
  listTask: Task[] = []; // Mảng lưu danh sách công việc
  listTask2: Task[] = []; // Mảng dự phòng cho danh sách công việc
  listDuAn: any[] = []; // Mảng lưu danh sách dự án
  listNhanVien: any[] = []; // Mảng lưu danh sách nhân viên

  constructor(private taskService: TaskService, private duAnService: DuAnService, private nhanVienService: NhanVienService) {}

  ngOnInit(): void {
    // Sử dụng forkJoin để kết hợp lấy danh sách công việc, dự án và nhân viên từ các service
    forkJoin([this.taskService.getAllTasks(), this.duAnService.getDuAnList(), this.nhanVienService.getListNhanVien()]).subscribe(([tasks, duAnList, nhanVienList]) => {
      this.listTask = tasks; // Lưu danh sách công việc
      this.listTask2 = tasks; // Sao lưu danh sách công việc
      this.listDuAn = duAnList; // Lưu danh sách dự án
      this.listNhanVien = nhanVienList; // Lưu danh sách nhân viên
    });
  }

  // Hàm xử lý tìm kiếm công việc
  filteredTask() {
    const keyword = this.searchTerm.toLowerCase(); // Chuyển từ khóa tìm kiếm về chữ thường
    this.listTask = this.listTask2.filter((task) => task.tenTask.toLowerCase().includes(keyword)); // Lọc danh sách công việc dựa trên từ khóa
  }

  // Hàm xác nhận xóa công việc
  confirmDelete(taskId: number) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa task này?'); // Hỏi người dùng xác nhận xóa

    if (confirmDelete) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.listTask = this.listTask.filter((task) => task.id !== taskId); // Xóa công việc sau khi xóa thành công
      });
    }
  }

  // Hàm lấy tên dự án dựa trên ID
  getTenDuAn(duAnID: number): string {
    const duAn = this.listDuAn.find((duAn) => duAn.id == duAnID); // Tìm dự án với ID tương ứng

    if (duAn) {
      return duAn.tenDuAn; // Trả về tên dự án
    } else {
      return 'Không tìm thấy';
    }
  }

  // Hàm lấy tên nhân viên dựa trên ID
  getTenNhanVien(nhanvienID: number): string {
    const nhanVien = this.listNhanVien.find((nhanVien) => nhanVien.id == nhanvienID); // Tìm nhân viên với ID tương ứng

    if (nhanVien) {
      return nhanVien.ho + ' ' + nhanVien.ten; // Trả về tên đầy đủ bằng cách kết hợp họ và tên
    } else {
      return 'Không tìm thấy';
    }
  }
}
