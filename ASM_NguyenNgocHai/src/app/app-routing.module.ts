import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DuanListComponent } from './duan-list/duan-list.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { DuanSuaComponent } from './duan-sua/duan-sua.component';
import { DuanChitietComponent } from './duan-chitiet/duan-chitiet.component';
import { NvListComponent } from './nv-list/nv-list.component';
import { NvThemComponent } from './nv-them/nv-them.component';
import { NvSuaComponent } from './nv-sua/nv-sua.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskThemComponent } from './task-them/task-them.component';
import { TaskSuaComponent } from './task-sua/task-sua.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'duan', component: DuanListComponent },
  { path: 'duan/:id', component: DuanChitietComponent },
  { path: 'duan/them', component: DuanThemComponent },
  { path: 'duan/sua/:id', component: DuanSuaComponent },
  { path: 'nhanvien', component: NvListComponent },
  { path: 'nhanvien/them', component: NvThemComponent },
  { path: 'nhanvien/sua/:id', component: NvSuaComponent },
  { path: 'task', component: TaskListComponent },
  { path: 'task/them', component: TaskThemComponent },
  { path: 'task/sua/:id', component: TaskSuaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
