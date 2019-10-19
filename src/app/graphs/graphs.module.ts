import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataGraphComponent } from './datagraph/datagraph.component';
import { PlotlyModule } from 'angular-plotly.js';
import { SelectorComponent } from './selector/selector.component';
import { GraphControlComponent } from './graph-control/graph-control.component';
import { GraphControlSelectionComponent } from './graph-control-selection/graph-control-selection.component';

@NgModule({
  declarations: [
    DataGraphComponent,
    SelectorComponent,
    GraphControlSelectionComponent,
    GraphControlComponent,
  ],
  imports: [
    CommonModule,
    PlotlyModule,
    FormsModule
  ],
  exports: [
    DataGraphComponent,
    SelectorComponent,
    GraphControlSelectionComponent,
    GraphControlComponent,
  ]
})
export class GraphsModule { }
