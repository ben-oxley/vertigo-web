import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ControlsComponent } from './controls.component';
import { ControlsRoutingModule } from './controls-routing.module';

@NgModule({
  imports: [
    ControlsRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ ControlsComponent ]
})
export class ControlsModule { }
