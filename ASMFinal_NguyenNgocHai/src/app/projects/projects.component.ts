import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/Project';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projectList: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList(): void {
    this.projectService.getProjectList().subscribe((projects) => {
      this.projectList = projects;
    });
  }

  addProject(): void {
    this.router.navigate(['/projects/add']);
  }

  viewProjectDetails(id: number): void {
    this.router.navigate(['/projects/detail', id]); 
  }

  editProject(id: number): void {
    this.router.navigate(['/projects/edit', id]);
  }

  deleteProject(id: number): void {
    if (confirm('Bạn có chắc muốn xóa dự án này?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.getProjectList();
      });
    }
  }
}
