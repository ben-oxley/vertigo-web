import { Component, OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmPolyline, AgmPolylinePoint, PolylineManager } from '@agm/core';

@Component({
  styles: [`
    agm-map {
      height: 800px;
    }
  `],
  templateUrl: 'map.component.html'
})

export class MapComponent implements OnInit {
  lat: number = 0.0;
  lng: number = 0.0;
  public data:CalculatedData;
  private map: any;
  
  constructor (public gMaps: GoogleMapsAPIWrapper,private _ngZone: NgZone){
    this.data = DashboardComponent.data;
    if (this.data && this.data.boardReference){
      this.lat = this.data.boardReference.y[0].y;
      this.lng = this.data.boardReference.x[0].y;
      var polylineManager = new PolylineManager(gMaps,_ngZone);
      var polyLine:AgmPolyline = new AgmPolyline(polylineManager);
      for (var i = 0; i < this.data.boardReference.y.length; i++){
        var point: AgmPolylinePoint = new AgmPolylinePoint();
        point.longitude = this.data.boardReference.x[i].y;
        point.latitude = this.data.boardReference.y[i].y;
        polyLine._getPoints().push(point);
      }
      polylineManager.addPolyline(polyLine);
    }
    
  }

  public loadAPIWrapper(map) {
    this.map = map;
  }

  ngOnInit(): void {
    this.gMaps.getNativeMap().then((map) => {
      this.loadAPIWrapper(map);
    });
  }
}
