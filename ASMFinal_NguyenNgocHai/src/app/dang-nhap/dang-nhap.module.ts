import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DangNhapRoutingModule } from './dang-nhap-routing.module';
import { DangNhapComponent } from './dang-nhap.component';


@NgModule({
  declarations: [
    DangNhapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DangNhapRoutingModule
  ]
})
export class DangNhapModule { }
