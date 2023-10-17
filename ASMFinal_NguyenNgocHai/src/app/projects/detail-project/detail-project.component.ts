import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interfaces/Project';
import { StaffService } from 'src/app/services/staff.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css'],
})
export class DetailProjectComponent implements OnInit {
  project: Project | undefined;
  leaderName: string = '';
  teamMemberNames: string[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private staffService: StaffService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const projectId = Number(params.get('id'));

      this.projectService
        .getProject(projectId)
        .pipe(
          catchError((error) => {
            return of(null);
          })
        )
        .subscribe((project) => {
          if (project) {
            this.project = project;

            const memberObservables = this.project.teamMembers.map((memberId) =>
              this.staffService.getStaff(memberId).pipe(
                catchError((error) => {
                  return of({ lastName: 'Không', firstName: 'tìm thấy' });
                })
              )
            );

            forkJoin(memberObservables).subscribe((names) => {
              this.teamMemberNames = names.map((name) => name.lastName + ' ' + name.firstName);
            });

            this.staffService
              .getStaff(this.project.leaderId)
              .pipe(
                catchError((error) => {
                  return of({ lastName: 'Không', firstName: 'tìm thấy' });
                })
              )
              .subscribe((leader) => {
                this.leaderName = leader.lastName + ' ' + leader.firstName;
              });
          }
        });
    });
  }
}
