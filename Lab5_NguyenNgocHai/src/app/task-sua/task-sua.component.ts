import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';

@Component({
  selector: 'app-task-sua',
  templateUrl: './task-sua.component.html',
  styleUrls: ['./task-sua.component.css'],
})
export class TaskSuaComponent implements OnInit {
  task: Task = {
    id: 0,
    tenTask: '',
    moTa: '',
    duAnID: 0,
    nhanvienID: 0,
    priority: 1,
    status: 0,
  };

  duAnList: any[] = [];
  nhanVienList: any[] = [];

  tenTaskError: boolean = false;
  moTaError: boolean = false;
  duAnIDError: boolean = false;
  nhanvienIDError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private duAnService: DuAnService,
    private nhanVienService: NhanVienService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const taskId = +params['id'];
      this.task = this.taskService.getTask(taskId) ?? {
        id: 0,
        tenTask: '',
        moTa: '',
        duAnID: 0,
        nhanvienID: 0,
        priority: 1,
        status: 0,
      };
  
      this.duAnList = this.duAnService.getDuAnList();
      this.nhanVienList = this.nhanVienService.getListNhanVien();
    });
  }
  

  updateTask() {
    this.tenTaskError = this.task.tenTask.trim() === '';
    this.moTaError = this.task.moTa.trim() === '';
    this.duAnIDError = this.task.duAnID === 0;
    this.nhanvienIDError = this.task.nhanvienID === 0;

    if (this.tenTaskError || this.moTaError || this.duAnIDError || this.nhanvienIDError) {
      return;
    }

    this.task.nhanvienID = +this.task.nhanvienID;
    this.task.duAnID = +this.task.duAnID;

    // Thực hiện cập nhật task
    this.taskService.updateTask(this.task);

    this.router.navigate(['/task']);
  }
}
