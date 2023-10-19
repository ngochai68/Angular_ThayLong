import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DuansRoutingModule } from './duans-routing.module';
import { DuansComponent } from './duans.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { DuanSuaComponent } from './duan-sua/duan-sua.component';
import { DuanChitietComponent } from './duan-chitiet/duan-chitiet.component';


@NgModule({
  declarations: [
    DuansComponent,
    DuanThemComponent,
    DuanSuaComponent,
    DuanChitietComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DuansRoutingModule
  ]
})
export class DuansModule { }
