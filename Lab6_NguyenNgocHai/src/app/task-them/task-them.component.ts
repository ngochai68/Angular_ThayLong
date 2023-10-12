import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  taskForm: FormGroup;
  duAnList: any[] = [];
  nhanVienList: any[] = [];
  submitted = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private duAnService: DuAnService, private nhanVienService: NhanVienService, private router: Router) {
    // Khởi tạo FormGroup để quản lý form và đặt trạng thái ban đầu
    this.taskForm = this.fb.group({
      tenTask: ['', [Validators.required]],
      moTa: ['', [Validators.required]],
      duAnID: [, [Validators.required]],
      nhanvienID: [, [Validators.required]],
      priority: [, [Validators.required]],
      status: [, [Validators.required]],
    });

    // Lấy danh sách dự án từ duAnService và danh sách nhân viên từ nhanVienService
    this.duAnService.getDuAnList().subscribe((duAnList) => {
      this.duAnList = duAnList;
    });

    this.nhanVienService.getListNhanVien().subscribe((nhanVienList) => {
      this.nhanVienList = nhanVienList;
    });
  }

  addTask() {
    this.submitted = true; // Đánh dấu rằng biểu mẫu đã được nộp

    if (this.taskForm.invalid) {
      // Hiển thị lỗi và ngăn chặn thêm task nếu form không hợp lệ
      this.taskForm.markAllAsTouched();
      return;
    }

    const newTask = this.taskForm.value;

    // Chuyển đổi giá trị từ chuỗi sang số
    newTask.duAnID = parseInt(newTask.duAnID, 10);
    newTask.nhanvienID = parseInt(newTask.nhanvienID, 10);
    newTask.priority = parseInt(newTask.priority, 10);
    newTask.status = parseInt(newTask.status, 10);

    this.taskService.addTask(newTask).subscribe(() => {
      this.router.navigate(['/task']);
    });
  }
}
