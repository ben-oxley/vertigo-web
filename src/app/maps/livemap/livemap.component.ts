import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';


@Component({
  selector: 'live-map',
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.scss']
})
export class LivemapComponent implements OnInit {

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
};

layersControl = {
	baseLayers: {
		'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
		'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
	},
	overlays: {
		'Big Circle': L.circle([ 46.95, -122 ], { radius: 5000 }),
		'Big Square': L.polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
	}
};

  constructor() { }

  ngOnInit() {
  }

}
