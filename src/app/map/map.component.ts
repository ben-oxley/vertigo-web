import { Component, OnInit, NgZone, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmPolyline, AgmPolylinePoint, PolylineManager } from '@agm/core';

@Component({
  styles: [`
    agm-map {
      height: 400px;
    }
  `],
  templateUrl: 'map.component.html'
})

export class MapComponent implements OnInit {
  @Input() locations:any = [];
  lat: number = 0.0;
  lng: number = 0.0;
  zoom:number = 16;
  public data:CalculatedData;
  private map: any;
  
  constructor (public gMaps: GoogleMapsAPIWrapper,private _ngZone: NgZone){
    this.data = DashboardComponent.data;
    if (this.data && this.data.boardReference){
      this.lat = this.data.boardReference.y[0].y;
      this.lng = this.data.boardReference.x[0].y;
      for (var i = 0; i < this.data.boardReference.y.length; i++){
        var point:any = {};
        point.longitude = this.data.boardReference.x[i].y;
        point.latitude = this.data.boardReference.y[i].y;
        this.locations.push(point);
      }
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
