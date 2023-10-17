import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffsComponent } from './staffs.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';


@NgModule({
  declarations: [
    StaffsComponent,
    EditStaffComponent,
    AddStaffComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StaffsRoutingModule
  ]
})
export class StaffsModule { }
