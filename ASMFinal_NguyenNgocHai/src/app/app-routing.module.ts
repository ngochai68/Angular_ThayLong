import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { baoveGuard } from './guards/baove.guard';

const routes: Routes = [
  { path: 'duan', loadChildren: () => import('./duans/duans.module').then((m) => m.DuansModule), canActivate: [baoveGuard]  },
  { path: 'nhanvien', loadChildren: () => import('./nhanviens/nhanviens.module').then((m) => m.NhanviensModule), canActivate: [baoveGuard]  },
  { path: 'task', loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule), canActivate: [baoveGuard]  },
  { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  { path: 'dangnhap', loadChildren: () => import('./dang-nhap/dang-nhap.module').then(m => m.DangNhapModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
