import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskThemComponent } from './task-them/task-them.component';
import { TaskSuaComponent } from './task-sua/task-sua.component';
import { quanlyGuard } from '../guards/quanly.guard';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'them', component: TaskThemComponent, canActivate: [quanlyGuard] },
  { path: 'sua/:id', component: TaskSuaComponent, canActivate: [quanlyGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
