import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LiveComponent } from './live/live.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LivemapComponent } from '../maps/livemap/livemap.component'
import { MapsModule } from '../maps/maps.module';

const PAGES_COMPONENTS = [
  PagesComponent,
  LiveComponent,
  BluetoothComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    MapsModule,
    LeafletModule.forRoot()
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
