import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quat2EulData } from './processes/quat2euldata';

@NgModule({
  declarations: [Quat2EulData],
  imports: [
    CommonModule
  ],
  exports: [
    Quat2EulData
  ]
})
export class ProcessingModule { }
