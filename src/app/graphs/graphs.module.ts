import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubismComponent } from './cubism/cubism.component';
import { DataGraphComponent } from './datagraph/datagraph.component';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  declarations: [
    CubismComponent,
    DataGraphComponent  
  ],
  imports: [
    CommonModule,
    PlotlyModule
  ],
  exports: [
    CubismComponent,
    DataGraphComponent
  ]
})
export class GraphsModule { }
