import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { VertigoRawData } from 'src/app/processing/vertigo-data';
import { Data } from 'src/app/processing/data';
import { RawData } from 'src/app/processing/processes/rawdata';
import { Dataspec } from '../../processing/dataspec';
import { DataType } from 'src/app/processing/datatype';
import { Column } from 'src/app/processing/column';


@Component({
  selector: 'live-map',
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.scss']
})
export class LivemapComponent implements OnInit, OnChanges {

  

  constructor() { }
  private static dataSpec: Dataspec = new Dataspec();
  private latlngs: [number, number][] = [
      [45.51, -122.68],
      [37.77, -122.43],
      [34.04, -118.2]
  ];
  @Input() lat = 0;
  @Input() lon = 0;
  public options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '...' }),
      L.polyline(this.latlngs),
    ],
    zoom: 5,
    center: L.latLng({ lat: this.lat, lng: this.lon }),
  };
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
  public layers = [];
  private vertigoRawData: VertigoRawData;
  private map: L.Map;

  @Input() set RawData(vertigoRawData: VertigoRawData) {
    this.vertigoRawData = vertigoRawData;
    const gpsSpecId = LivemapComponent.dataSpec.Types.find(s => s.Id === "gps");
    const latId: Column = gpsSpecId.Columns.find(c => c.Id === "lat");
    const lonId: Column = gpsSpecId.Columns.find(c => c.Id === "lon");
    if (this.vertigoRawData){
      const data: Data[] = RawData.Cast(this.vertigoRawData.DataTypes.get(gpsSpecId.Identifier)).Data();
      const t0 = data[0].Data[0];
      const latlngs: [number, number][] = data.map(datum => [+datum.Data[latId.Identifier], +datum.Data[lonId.Identifier]]);
      const path: L.Polyline = L.polyline(latlngs);
      this.layers.push(path);
      this.map.fitBounds(path.getBounds());
    }
  }

  reload() {
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

  ngOnInit() {

  }

  onMapReady(map: L.Map) {
    this.map = map;
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

}
