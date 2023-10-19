import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NhanviensRoutingModule } from './nhanviens-routing.module';
import { NhanviensComponent } from './nhanviens.component';
import { NvThemComponent } from './nv-them/nv-them.component';
import { NvSuaComponent } from './nv-sua/nv-sua.component';


@NgModule({
  declarations: [
    NhanviensComponent,
    NvThemComponent,
    NvSuaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NhanviensRoutingModule
  ]
})
export class NhanviensModule { }
