import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    PlotlyModule,
    FormsModule
  ],
  exports: [
    DataGraphComponent,
    SelectorComponent
  ]
})
export class GraphsModule { }
