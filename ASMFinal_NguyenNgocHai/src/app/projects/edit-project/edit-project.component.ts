import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { StaffService } from 'src/app/services/staff.service';
import { Project } from 'src/app/interfaces/Project';
import { Staff } from 'src/app/interfaces/Staff';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  projectForm: FormGroup; // FormGroup cho biểu mẫu sửa dự án
  staffs: Staff[] = []; // Danh sách nhân viên
  submitted: boolean = false; // Biến để theo dõi trạng thái đã nộp biểu mẫu hay chưa
  projectId: number = 0;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private staffService: StaffService, private router: Router, private route: ActivatedRoute) {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      budget: [, [Validators.required, Validators.min(1)]],
      leaderId: [, [Validators.required]],
      teamMembers: [[], [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = +params['id'];
      this.loadProject(this.projectId);
    });

    // Sử dụng forkJoin để kết hợp việc tải dữ liệu từ staffService và projectService
    forkJoin([this.staffService.getStaffList(), this.projectService.getProject(this.projectId)]).subscribe(([staffs, project]) => {
      this.staffs = staffs;

      const leaderExists = this.staffs.some((staff) => staff.id === +project.leaderId);
      if (!leaderExists) {
        // Xóa giá trị leader khỏi form
        this.projectForm.get('leaderId')?.setValue(null);
      }

      const teamMembers = this.projectForm.get('teamMembers')?.value;
      const validTeamMembers = teamMembers.filter((memberId: number) => this.staffs.some((staff) => staff.id === memberId));

      if (validTeamMembers.length !== teamMembers.length) {
        // Xóa giá trị teamMembers không hợp lệ khỏi form
        this.projectForm.get('teamMembers')?.setValue(validTeamMembers);
      }
    });
  }

  loadProject(id: number): void {
    this.projectService.getProject(id).subscribe((project) => {
      this.projectForm.patchValue({
        projectName: project.projectName,
        startDate: project.startDate,
        budget: project.budget,
        leaderId: project.leaderId,
        teamMembers: project.teamMembers,
      });
    });
  }

  updateProject(): void {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    const updatedProject: Project = {
      id: this.projectId,
      ...this.projectForm.value,
    };

    this.projectService.updateProject(updatedProject).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}
