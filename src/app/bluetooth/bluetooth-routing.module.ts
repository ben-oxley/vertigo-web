import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BluetoothComponent } from './bluetooth.component';

const routes: Routes = [
  {
    path: '',
    component: BluetoothComponent,
    data: {
      title: 'Bluetooth'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BluetoothRoutingModule {}
