import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveComponent } from './live/live.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { SprintingComponent } from './sprinting/sprinting.component';
import { TrampolineComponent } from './trampoline/trampoline.component';
import { PendulumComponent } from './pendulum/pendulum.component';
import { CircularMotionComponent } from './circular-motion/circular-motion.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'live',
      component: LiveComponent,
    },
    {
      path: 'bluetooth',
      component: BluetoothComponent,
    },
    {
      path: 'circular-motion',
      component: CircularMotionComponent,
    },
    {
      path: 'pendulum',
      component: PendulumComponent,
    },
    {
      path: 'trampoline',
      component: TrampolineComponent,
    },
    {
      path: 'sprinting',
      component: SprintingComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
