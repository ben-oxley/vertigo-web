import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { GraphComponent } from './graph.component';
import { GraphRoutingModule } from './graph-routing.module';

@NgModule({
  imports: [
    GraphRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ GraphComponent ]
})
export class DashboardModule { }
