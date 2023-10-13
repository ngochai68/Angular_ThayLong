import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service'; // Import service cho Task
import { DuAnService } from '../du-an.service'; // Import service cho Dự án
import { NhanVienService } from '../nhan-vien.service'; // Import service cho Nhân viên
import { Router, ActivatedRoute } from '@angular/router'; // Import router và route
import { forkJoin } from 'rxjs'; // Import operator forkJoin để xử lý nhiều Observable

@Component({
  selector: 'app-task-sua',
  templateUrl: './task-sua.component.html',
  styleUrls: ['./task-sua.component.css'],
})
export class TaskSuaComponent implements OnInit {
  taskForm: FormGroup; // Biến chứa FormGroup để xử lý form
  duAnList: any[] = []; // Mảng chứa danh sách dự án
  nhanVienList: any[] = []; // Mảng chứa danh sách nhân viên
  submitted = false; // Biến để đánh dấu rằng form đã được nộp
  taskId: number = 0; // Khởi tạo giá trị ban đầu cho taskId (ID của công việc)

  constructor(
    private fb: FormBuilder, // Sử dụng FormBuilder để tạo và quản lý form
    private taskService: TaskService, // Inject service cho Task
    private duAnService: DuAnService, // Inject service cho Dự án
    private nhanVienService: NhanVienService, // Inject service cho Nhân viên
    private router: Router, // Để điều hướng đến một URL khác sau khi cập nhật công việc
    private route: ActivatedRoute // Để lấy tham số từ URL
  ) {
    // Khởi tạo FormGroup và đặt các trạng thái ban đầu và ràng buộc cho form
    this.taskForm = this.fb.group({
      tenTask: ['', [Validators.required]],
      moTa: ['', [Validators.required]],
      duAnID: [, [Validators.required]],
      nhanvienID: [, [Validators.required]],
      priority: [, [Validators.required]],
      status: [, [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.taskId = +params['id']; // Lấy ID công việc từ URL và gán cho taskId

      // Sử dụng forkJoin để lấy thông tin dự án, nhân viên và công việc cần chỉnh sửa
      forkJoin([this.duAnService.getDuAnList(), this.nhanVienService.getListNhanVien(), this.taskService.getTask(this.taskId)]).subscribe(([duAnList, nhanVienList, task]) => {
        this.duAnList = duAnList; // Lưu danh sách dự án
        this.nhanVienList = nhanVienList; // Lưu danh sách nhân viên

        // Đổ dữ liệu của công việc cần chỉnh sửa vào form
        this.taskForm.setValue({
          tenTask: task.tenTask,
          moTa: task.moTa,
          duAnID: task.duAnID,
          nhanvienID: task.nhanvienID,
          priority: task.priority,
          status: task.status,
        });

        // Kiểm tra xem duAnID có tồn tại trong duAnList hay không
        const duAnIDExists = this.duAnList.some((duAn) => duAn.id == task.duAnID);

        if (!duAnIDExists) {
          // Nếu duAnID không tồn tại trong duAnList, xóa giá trị duAnID
          this.taskForm.get('duAnID')?.setValue(null);
        }

        // Kiểm tra xem nhanvienID có tồn tại trong nhanVienList hay không
        const nhanvienIDExists = this.nhanVienList.some((nhanVien) => nhanVien.id == task.nhanvienID);

        if (!nhanvienIDExists) {
          // Nếu nhanvienID không tồn tại trong nhanVienList, xóa giá trị nhanvienID
          this.taskForm.get('nhanvienID')?.setValue(null);
        }
      });
    });
  }

  // Hàm xử lý cập nhật công việc
  updateTask() {
    this.submitted = true; // Đánh dấu rằng form đã được nộp

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched(); // Đánh dấu là tất cả các trường form đã được chạm vào (để hiển thị thông báo lỗi)
      return;
    }

    const updatedTask = this.taskForm.value; // Lấy giá trị từ form

    // Gán ID của công việc cho updatedTask
    updatedTask.id = this.taskId;

    // Chuyển đổi giá trị từ chuỗi sang số
    updatedTask.duAnID = parseInt(updatedTask.duAnID, 10);
    updatedTask.nhanvienID = parseInt(updatedTask.nhanvienID, 10);
    updatedTask.priority = parseInt(updatedTask.priority, 10);
    updatedTask.status = parseInt(updatedTask.status, 10);

    // Gọi service để cập nhật công việc và sau khi cập nhật, điều hướng về trang danh sách công việc
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.router.navigate(['/task']);
    });
  }
}
