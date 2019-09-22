import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGraphComponent } from './datagraph/datagraph.component';
import { PlotlyModule } from 'angular-plotly.js';
import { SelectorComponent } from './selector/selector.component';

@NgModule({
  declarations: [
    DataGraphComponent,
    SelectorComponent  
  ],
  imports: [
    CommonModule,
    PlotlyModule
  ],
  exports: [
    DataGraphComponent,
    SelectorComponent
  ]
})
export class GraphsModule { }
