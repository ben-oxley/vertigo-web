import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BluetoothComponent } from './pages/bluetooth/bluetooth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VelocitytimeComponent } from './pages/velocitytime/velocitytime.component';
import { PendulumComponent } from './pages/pendulum/pendulum.component';
import { CircularmotionComponent } from './pages/circularmotion/circularmotion.component';
import { TrampolineComponent } from './pages/trampoline/trampoline.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';


const routes: Routes = [
  { path: 'bluetooth', component: BluetoothComponent},
  { path: '' , component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'velocity-time', component: VelocitytimeComponent},
  { path: 'pendulum', component: PendulumComponent},
  { path: 'circularmotion', component: CircularmotionComponent},
  { path: 'trampoline', component: TrampolineComponent},
  { path: 'instructions', component: InstructionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
