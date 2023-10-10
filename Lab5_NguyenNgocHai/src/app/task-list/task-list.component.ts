import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  searchTerm: string = '';
  listTask: Task[] = [];

  constructor(private duAnService: DuAnService, private nhanVienService: NhanVienService, private taskService: TaskService) {}
  listTask2: Task[] = [];

  ngOnInit(): void {
    this.listTask = this.taskService.getAllTasks();
    this.listTask2 = this.listTask;
  }

  filteredTask() {
    const keyword = this.searchTerm.toLowerCase();
    this.listTask = this.listTask2.filter((p) =>
      p.tenTask.toLowerCase().includes(keyword)
    );
  }

  getTenDuAn(duAnID: number): string | undefined {
    return this.duAnService.getTenDuAn(duAnID);
  }

  getTenNhanVien(nhanvienID: number): string | undefined {
    return this.nhanVienService.getTenNhanVien(nhanvienID);
  }

  deleteTask(taskId: number) {
    // Xác nhận xóa
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa task này?');
    
    if (confirmDelete) {
      // Gọi phương thức xóa task từ service
      this.taskService.deleteTask(taskId);

      // Cập nhật lại danh sách sau khi xóa
      this.listTask = this.listTask.filter((task) => task.id !== taskId);
    }
  }
}
