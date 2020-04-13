import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TrimSliderComponent } from './trim-slider/trim-slider.component';
import { PlotlyModule } from 'angular-plotly.js';
import { ProcessorComponent } from './processor/processor.component';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';



@NgModule({
  declarations: [LoaderComponent, TrimSliderComponent, ProcessorComponent, TabsComponent, TabComponent],
  imports: [
    CommonModule,
    PlotlyModule,
    FormsModule
  ],
  exports: [
    LoaderComponent,
    ProcessorComponent,
    TabsComponent,
    TabComponent
    
  ]
})
export class ControlsModule { }
