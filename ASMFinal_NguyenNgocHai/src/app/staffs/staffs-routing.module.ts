import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffsComponent } from './staffs.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';

const routes: Routes = [
  { path: '', component: StaffsComponent },
  { path: 'edit/:id', component: EditStaffComponent },
  { path: 'add', component: AddStaffComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffsRoutingModule {}
