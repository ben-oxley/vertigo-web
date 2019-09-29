import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';


@Component({
  selector: 'live-map',
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.scss']
})
export class LivemapComponent implements OnInit, OnChanges {


  @Input() lat = 0;
  @Input() lon = 0;
  private map:L.Map;
  public options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '...' }),
    ],
    zoom: 5,
    center: L.latLng({ lat: this.lat, lng: this.lon }),
  };

  public layers = [];


  public layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Esri World Imagery': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }),
      'CartoDB DarkMatter': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      })
    }
  };

  reload(){
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lat && this.lon) {
      this.options.center = L.latLng({ lat: this.lat, lng: this.lon })
      const markerIcon = L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/img/markers/marker-icon.png',
        shadowUrl: 'assets/img/markers/marker-shadow.png'
      });
      this.layers[0] = L.marker([this.lat, this.lon], { icon: markerIcon });
    }
  }

  constructor() { }

  ngOnInit() {

  }

  onMapReady(map: L.Map) {
    this.map = map;
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

}
