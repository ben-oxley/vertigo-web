import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TrimSliderComponent } from './trim-slider/trim-slider.component';
import { PlotlyModule } from 'angular-plotly.js';



@NgModule({
  declarations: [LoaderComponent, TrimSliderComponent],
  imports: [
    CommonModule,
    PlotlyModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class ControlsModule { }
