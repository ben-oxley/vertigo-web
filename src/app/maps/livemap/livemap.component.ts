import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { VertigoRawData } from "src/app/processing/vertigo-data";
import { Data } from 'src/app/processing/data';
import { RawData } from 'src/app/processing/processes/rawdata';
import { Dataspec } from '../../processing/dataspec';
import { DataType } from 'src/app/processing/datatype';
import { Column } from 'src/app/processing/column';
import { DataListener } from 'src/app/processing/listener';


@Component({
  selector: 'live-map',
  templateUrl: './livemap.component.html',
  styleUrls: ['./livemap.component.scss']
})
export class LivemapComponent implements OnInit, OnChanges {

  

  constructor() { }
  private static dataSpec: Dataspec = new Dataspec();

  private markerIcon: L.Icon = L.icon({
    iconSize:     [32, 32], // size of the icon
    shadowSize:   [32, 25], // size of the shadow
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
    shadowAnchor: [13, 25],  // the same for the shadow
    iconUrl: 'assets/map/map-marker.png',
    shadowUrl: 'assets/map/marker-shadow.png'
  });
  @Input() lat = 0;
  @Input() lon = 0;
  public options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '...' }),
      L.polyline([[]]),
      L.marker([0, 0], { icon: this.markerIcon })
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
  public layers = this.options.layers;
  private vertigoRawData: VertigoRawData;
  private map: L.Map;

  @Input() set RawData(vertigoRawData: VertigoRawData) {
    this.vertigoRawData = vertigoRawData;
    const gpsSpecId = LivemapComponent.dataSpec.Types.find(s => s.Id === "gps");
    const latId: Column = gpsSpecId.Columns.find(c => c.Id === "lat");
    const lonId: Column = gpsSpecId.Columns.find(c => c.Id === "lon");
    if (this.vertigoRawData) {
      const rawData: RawData = this.vertigoRawData.DataTypes.get(gpsSpecId.Identifier);
      rawData.AddListener((a,r)=>{
          a.forEach(dp=>{
            const polyLine: L.Polyline = this.layers[1] as L.Polyline;
            polyLine.addLatLng([+dp.Data[latId.Identifier], +dp.Data[lonId.Identifier]]);
          });
      });
      
      const data: Data[] = rawData.Data();
      if (data.length>0) {
        const t0 = data[0].Data[0];
        const latlngs: [number, number][] = data.map(datum => [+datum.Data[latId.Identifier], +datum.Data[lonId.Identifier]]);
        const path: L.Polyline = L.polyline(latlngs);
        this.layers[1] = path;
        this.map.fitBounds(path.getBounds());
        this.lat = latlngs[latlngs.length - 1][0];
        this.lon = latlngs[latlngs.length - 1][1];
        this.layers[2] = L.marker(latlngs[latlngs.length - 1], { icon: this.markerIcon });
      }
    }
  }

  public reload() {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lat && this.lon) {
      this.options.center = L.latLng({ lat: this.lat, lng: this.lon });
      this.layers[1] = this.layers[1];
      this.layers[2] = L.marker([this.lat, this.lon], { icon: this.markerIcon });
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
