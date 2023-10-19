import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhanviensComponent } from './nhanviens.component';
import { NvThemComponent } from './nv-them/nv-them.component';
import { NvSuaComponent } from './nv-sua/nv-sua.component';
import { quanlyGuard } from '../guards/quanly.guard';

const routes: Routes = [
  { path: '', component: NhanviensComponent },
  { path: 'them', component: NvThemComponent, canActivate: [quanlyGuard] },
  { path: 'sua/:id', component: NvSuaComponent, canActivate: [quanlyGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhanviensRoutingModule {}
