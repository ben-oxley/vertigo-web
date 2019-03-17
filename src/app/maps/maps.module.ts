import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivemapComponent } from './livemap/livemap.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [LivemapComponent],
  imports: [
    CommonModule,
    LeafletModule.forRoot(),
  ],
  exports: [
    LivemapComponent
  ]
})
export class MapsModule { }
