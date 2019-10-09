import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TrimSliderComponent } from './trim-slider/trim-slider.component';
import { PlotlyModule } from 'angular-plotly.js';
import { ProcessorComponent } from './processor/processor.component';



@NgModule({
  declarations: [LoaderComponent, TrimSliderComponent, ProcessorComponent],
  imports: [
    CommonModule,
    PlotlyModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class ControlsModule { }
