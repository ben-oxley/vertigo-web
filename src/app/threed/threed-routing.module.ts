import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThreeDComponent } from './threed.component';

const routes: Routes = [
  {
    path: '',
    component: ThreeDComponent,
    data: {
      title: '3D View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeDRoutingModule {}
