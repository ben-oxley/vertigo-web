import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'loader',
        loadChildren: './loader/loader.module#LoaderModule'
      },
      {
        path: 'map',
        loadChildren: './map/map.module#MapModule'
      },
      {
        path: '3d',
        loadChildren: './threed/threed.module#ThreeDModule'
      },
      {
        path: 'bluetooth',
        loadChildren: './bluetooth/bluetooth.module#BluetoothModule'
      }
    ]
  },
  {
    path: 'beta',
    component: SimpleLayoutComponent,
    data: {
      title: 'Beta'
    },
    children: [
      {
        path: '3d',
        loadChildren: './threed/threed.module#ThreeDModule'
      },
      {
        path: 'bluetooth',
        loadChildren: './bluetooth/bluetooth.module#BluetoothModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
