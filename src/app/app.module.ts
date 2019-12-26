import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapsModule } from './maps/maps.module';
import { GraphsModule } from './graphs/graphs.module';
import { ControlsModule } from './controls/controls.module';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faTag, faCloudDownloadAlt, faStop, faPause, faPlay, faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { faBluetooth } from '@fortawesome/free-brands-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    ControlsModule,
    GraphsModule,
    PlotlyModule,
    MapsModule,
    PagesModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add an icon to the library for convenient access in other components
    //library.addIconPacks(fas, fab, far);
    library.addIcons(faBluetooth, faCloudDownloadAlt, faPause, faPlay, faStop, faTag, faCompressArrowsAlt);
    faConfig.defaultPrefix = 'far';
  }
}

