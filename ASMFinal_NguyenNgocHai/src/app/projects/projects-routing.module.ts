import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'add', component: AddProjectComponent },
  { path: 'detail/:id', component: DetailProjectComponent },
  { path: 'edit/:id', component: EditProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
