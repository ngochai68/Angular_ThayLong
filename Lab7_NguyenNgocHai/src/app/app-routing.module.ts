import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
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
import { baoveGuard } from './baove.guard';
import { quanlyGuard } from './quanly.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dangnhap', component: DangNhapComponent },
  { path: 'duan', component: DuanListComponent, canActivate: [baoveGuard] },
  { path: 'duan/them', component: DuanThemComponent, canActivate: [quanlyGuard] },
  { path: 'duan/:id', component: DuanChitietComponent, canActivate: [baoveGuard] },
  { path: 'duan/sua/:id', component: DuanSuaComponent, canActivate: [quanlyGuard] },
  { path: 'nhanvien', component: NvListComponent, canActivate: [baoveGuard] },
  { path: 'nhanvien/them', component: NvThemComponent, canActivate: [quanlyGuard] },
  { path: 'nhanvien/sua/:id', component: NvSuaComponent, canActivate: [quanlyGuard] },
  { path: 'task', component: TaskListComponent, canActivate: [baoveGuard] },
  { path: 'task/them', component: TaskThemComponent, canActivate: [quanlyGuard] },
  { path: 'task/sua/:id', component: TaskSuaComponent, canActivate: [quanlyGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
