import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';

import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  providers: [GoogleMapsAPIWrapper],
  imports: [
    CommonModule,
    MapRoutingModule,
    ChartsModule,
    BsDropdownModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxXmxe-LtnUHSDI9PipbPC4gLW-s5SimE'
    })
    
  ],
  exports: [AgmCoreModule],
  declarations: [ MapComponent ]
})

export class MapModule { }
