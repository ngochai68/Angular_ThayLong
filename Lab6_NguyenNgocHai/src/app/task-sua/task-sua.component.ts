import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { DuAnService } from '../du-an.service';
import { NhanVienService } from '../nhan-vien.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-sua',
  templateUrl: './task-sua.component.html',
  styleUrls: ['./task-sua.component.css'],
})
export class TaskSuaComponent implements OnInit {
  taskForm: FormGroup;
  duAnList: any[] = [];
  nhanVienList: any[] = [];
  submitted = false;
  taskId: number = 0;
    

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private duAnService: DuAnService,
    private nhanVienService: NhanVienService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
      this.taskId = +params['id'];
      this.loadTaskDetails(this.taskId);
    });

    this.duAnService.getDuAnList().subscribe((duAnList) => {
      this.duAnList = duAnList;
    });

    this.nhanVienService.getListNhanVien().subscribe((nhanVienList) => {
      this.nhanVienList = nhanVienList;
    });
  }

  loadTaskDetails(id: number) {
    this.taskService.getTask(id).subscribe((task) => {
      this.taskForm.setValue({
        tenTask: task.tenTask,
        moTa: task.moTa,
        duAnID: task.duAnID,
        nhanvienID: task.nhanvienID,
        priority: task.priority,
        status: task.status,
      });
    });
  }

  updateTask() {
    this.submitted = true;

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const updatedTask = this.taskForm.value;
    updatedTask.id = this.taskId;
    updatedTask.priority = +updatedTask.priority;
    updatedTask.status = +updatedTask.status;

    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.router.navigate(['/task']);
    });
  }
}
