import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LiveComponent } from './live/live.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { LivemapComponent } from '../maps/livemap/livemap.component'
import { MapsModule } from '../maps/maps.module';
import { GraphsModule } from '../graphs/graphs.module';
import { ControlsModule } from '../controls/controls.module';

const PAGES_COMPONENTS = [
  PagesComponent,
  LiveComponent,
  BluetoothComponent,
  DashboardComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ControlsModule,
    MapsModule,
    GraphsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
