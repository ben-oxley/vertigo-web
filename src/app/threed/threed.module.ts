import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationComponent } from './orientation/orientation.component';



@NgModule({
  declarations: [OrientationComponent],
  imports: [
    CommonModule
  ],
  exports:[
    OrientationComponent
  ]
})
export class ThreedModule { }
