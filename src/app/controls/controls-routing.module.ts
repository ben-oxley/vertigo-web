import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ControlsComponent } from './controls.component';

const routes: Routes = [
  {
    path: '',
    component: ControlsComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlsRoutingModule {}
