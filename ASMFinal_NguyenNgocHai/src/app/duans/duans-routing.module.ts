import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuansComponent } from './duans.component';
import { DuanChitietComponent } from './duan-chitiet/duan-chitiet.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { DuanSuaComponent } from './duan-sua/duan-sua.component';
import { quanlyGuard } from '../guards/quanly.guard';

const routes: Routes = [
  { path: '', component: DuansComponent },
  { path: 'them', component: DuanThemComponent, canActivate: [quanlyGuard] },
  { path: 'sua/:id', component: DuanSuaComponent, canActivate: [quanlyGuard] },
  { path: ':id', component: DuanChitietComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuansRoutingModule {}
