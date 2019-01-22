import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubismComponent } from './cubism/cubism.component';

@NgModule({
  declarations: [CubismComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CubismComponent
  ]
})
export class GraphsModule { }
