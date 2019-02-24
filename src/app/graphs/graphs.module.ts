import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubismComponent } from './cubism/cubism.component';
import { DataGraphComponent } from './datagraph/datagraph.component';
import { PlotlyModule } from 'angular-plotly.js';
import { SelectorComponent } from './selector/selector.component';
import {TabsModule} from "ngx-tabs";
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [
    CubismComponent,
    DataGraphComponent,
    SelectorComponent  
  ],
  imports: [
    ThemeModule,
    CommonModule,
    PlotlyModule,
    TabsModule
  ],
  exports: [
    CubismComponent,
    DataGraphComponent,
    SelectorComponent
  ]
})
export class GraphsModule { }
