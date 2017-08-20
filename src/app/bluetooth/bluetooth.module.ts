import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { BluetoothComponent } from './bluetooth.component';
import { BluetoothRoutingModule } from './bluetooth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BluetoothRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ BluetoothComponent ]
})

export class BluetoothModule { }
