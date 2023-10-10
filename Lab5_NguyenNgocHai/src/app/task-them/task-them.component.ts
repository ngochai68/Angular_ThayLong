import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-them',
  templateUrl: './task-them.component.html',
  styleUrls: ['./task-them.component.css'],
})
export class TaskThemComponent {
  newTask: Task = {
    id: 0, // Tạo ID mới cho task (tùy thuộc vào logic của ứng dụng)
    tenTask: '',
    moTa: '',
    duAnID: 0,
    nhanvienID: 0,
    priority: 1,
    status: 0,
  };

  duAnList: any[] = []; // Khai báo và khởi tạo dữ liệu cho danh sách dự án
  nhanVienList: any[] = []; // Khai báo và khởi tạo dữ liệu cho danh sách nhân viên

  // Biến trạng thái lỗi
  tenTaskError: boolean = false;
  moTaError: boolean = false;
  duAnIDError: boolean = false;
  nhanvienIDError: boolean = false;

  constructor(
    private taskService: TaskService,
    private duAnService: DuAnService, // Inject DuAnService để lấy danh sách dự án
    private nhanVienService: NhanVienService, // Inject NhanVienService để lấy danh sách nhân viên
    private router: Router
  ) {
    this.duAnList = this.duAnService.getDuAnList(); // Lấy danh sách dự án

    this.nhanVienList = this.nhanVienService.getListNhanVien(); // Lấy danh sách nhân viên
  }

  addTask() {
    // Kiểm tra và thiết lập biến trạng thái lỗi khi cần thiết
    this.tenTaskError = this.newTask.tenTask.trim() === '';
    this.moTaError = this.newTask.moTa.trim() === '';
    this.duAnIDError = this.newTask.duAnID === 0;
    this.nhanvienIDError = this.newTask.nhanvienID === 0;

    // Nếu có lỗi, không thực hiện thêm task và hiển thị thông báo lỗi
    if (this.tenTaskError || this.moTaError || this.duAnIDError || this.nhanvienIDError) {
      return;
    }

    this.newTask.nhanvienID = +this.newTask.nhanvienID;
    this.newTask.duAnID = +this.newTask.duAnID;

    // Thêm task mới vào danh sách task
    this.taskService.addTask(this.newTask);

    this.router.navigate(['/task']);
  }
}
