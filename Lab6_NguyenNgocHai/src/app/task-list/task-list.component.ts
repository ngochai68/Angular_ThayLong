import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  searchTerm: string = '';
  listTask: Task[] = [];
  listTask2: Task[] = [];
  tenDuAn: string | undefined;

  constructor(
    private duAnService: DuAnService,
    private nhanVienService: NhanVienService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.listTask = tasks;
      this.listTask2 = this.listTask;

      // Lấy danh sách tên dự án và nhân viên
      const observables = this.listTask.map((task) => {
        const duAnObservable = this.duAnService.getDuAn(task.duAnID).pipe(
          catchError(() => of({ tenDuAn: 'Không tìm thấy' }))
        );
        const nhanVienObservable = this.nhanVienService.getNhanVien(task.nhanvienID).pipe(
          catchError(() => of({ ho: 'Không tìm thấy', ten: '' }))
        );
        return forkJoin([duAnObservable, nhanVienObservable]);
      });

      forkJoin(observables).subscribe((results) => {
        results.forEach((result, index) => {
          this.listTask[index].tenDuAn = result[0].tenDuAn;

          // Sử dụng trường cụ thể của đối tượng NhanVien, ví dụ: ho và ten
          this.listTask[index].tenNhanVien = result[1].ho + ' ' + result[1].ten;
        });
      });
    });
  }

  filteredTask() {
    const keyword = this.searchTerm.toLowerCase();
    this.listTask = this.listTask2.filter((p) => p.tenTask.toLowerCase().includes(keyword));
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
