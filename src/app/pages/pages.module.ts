import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LiveComponent } from './live/live.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LivemapComponent } from '../maps/livemap/livemap.component'
import { MapsModule } from '../maps/maps.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GraphsModule } from '../graphs/graphs.module';
import { ControlsModule } from '../controls/controls.module';
import { SprintingComponent } from './sprinting/sprinting.component';
import { PendulumComponent } from './pendulum/pendulum.component';
import { CircularMotionComponent } from './circular-motion/circular-motion.component';
import { TrampolineComponent } from './trampoline/trampoline.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  LiveComponent,
  BluetoothComponent,
  DashboardComponent,
  SprintingComponent,
  PendulumComponent,
  CircularMotionComponent,
  TrampolineComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ControlsModule,
    ThemeModule,
    MiscellaneousModule,
    MapsModule,
    LeafletModule.forRoot(),
    GraphsModule,
    AngularFontAwesomeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,

  ],
})
export class PagesModule {
}
