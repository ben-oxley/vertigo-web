import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { LivemapComponent } from '../maps/livemap/livemap.component'
import { MapsModule } from '../maps/maps.module';
import { GraphsModule } from '../graphs/graphs.module';
import { ControlsModule } from '../controls/controls.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const PAGES_COMPONENTS = [
  PagesComponent,
  BluetoothComponent,
  DashboardComponent
];

@NgModule({
  imports: [
    ControlsModule,
    MapsModule,
    GraphsModule,
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
