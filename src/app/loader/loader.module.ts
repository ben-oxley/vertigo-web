import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LoaderComponent } from './loader.component';
import { LoaderRoutingModule } from './loader-routing.module';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    LoaderRoutingModule,
    ChartsModule,
    HttpModule,
    BsDropdownModule
  ],
  declarations: [ LoaderComponent ]
})
export class LoaderModule { }
