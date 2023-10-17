import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { StaffService } from 'src/app/services/staff.service';
import { Staff } from 'src/app/interfaces/Staff';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  submitted = false;
  staffList: Staff[] = [];

  constructor(private fb: FormBuilder, private projectService: ProjectService, private staffService: StaffService, private router: Router) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      startDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1)]],
      leaderId: ['', Validators.required],
      teamMembers: [[]],
    });
  }

  ngOnInit() {
    this.getStaffList();
  }

  getStaffList(): void {
    this.staffService.getStaffList().subscribe((staffs) => {
      this.staffList = staffs;
    });
  }

  addProject(): void {
    this.submitted = true;

    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      this.projectService.addProject(project).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
