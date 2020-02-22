import { Component, SimpleChanges, Input } from '@angular/core';
import { VertigoProcessedData } from '../../processing/vertigo-data';
import { VertigoRawData } from "../../processing/vertigo-data";
import { DataType } from '../../processing/datatype';
import { Data } from '../../processing/data';
import { Dataspec } from '../../processing/dataspec';
import { RawData } from 'src/app/processing/processes/rawdata';
import { VertigoDataStore } from 'src/app/processing/VertigoDataStore';
import { VertigoDataStoreManager } from 'src/app/processing/VertigoDataStoreManager';
import { DataStoreListener } from 'src/app/processing/DataStoreListener';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input() Progress = 100.0;
  public VertigoRawData: VertigoRawData;
  public VertigoProcessedData: VertigoProcessedData;
  public DataStore:VertigoDataStore;
  public GraphData: any;
  public SelectedValues: any = { columns: [] }
  public accx: number = 0.0;
  public accy: number = 0.0;
  public accz: number = 0.0;
  public acc2: number = 0.0;
  public rotx: number = 0.0;
  public roty: number = 0.0;
  public rotz: number = 0.0;
  public lon: number = 1.0;
  public lat: number = 50.0;
  public alt: number = 0.0;
  public q0: number = 0.0;
  public q1: number = 0.0;
  public q2: number = 0.0;
  public q3: number = 0.0;
  private SelectedSeries: DataType[] = [];

  public constructor() {
    this.GraphData = [{
    }]
    this.DataStore = VertigoDataStoreManager.GetDataStore();
    this.DataStore.AddListener(this);
  }

  
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.SelectedValues);
  }
  
  public seriesChanged(event: DataType[]) {
    this.GraphData = this.flatMap(event, dt => {
      if (this.DataStore.GetAvailableDataTypes() && this.DataStore.GetAvailableDataTypes().find(t=>t.Identifier==dt.Identifier)) {
        const matchingType = this.DataStore.GetAvailableDataTypes().find(t=>t.Identifier==dt.Identifier);
        const data: Data[] = RawData.Cast(this.DataStore.Get(matchingType)).Data();
        if (data && data.length > 0) {
          return dt.Columns.map(c => {
            const t0 = data[0].Data[0];
            return {
              x: data.map(datum => (datum.Data[0] - t0) / 1000.0),
              y: data.map(datum => datum.Data[c.Identifier]),
              name: c.Name,
              yaxis: c.Id
            } as any;
          });
        }
      }
    });
    return;
  }
  
  private flatMap<I, O>(array: Array<I>, func: (x: I) => O[]): Array<O> {
    let concatArray: Array<O> = [];
    array.map(func).forEach(set => concatArray = concatArray.concat(set));
    return concatArray;
  }
  
  
  public onLoaded(event: VertigoRawData) {
    this.VertigoRawData = event;
    if (this.flatMap(this.SelectedSeries, dt => dt.Columns).length === 0) {
      const spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(0, 3);
      spec.Types = [spec.Types[1]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.SelectedSeries);
    }
  }

  public DataChanged(added: DataType[], removed: DataType[]){
    if (this.flatMap(this.SelectedSeries, dt => dt.Columns).length === 0) {
      let spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(0, 3);
      spec.Types = [spec.Types[1]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.SelectedSeries);
    }
  }
  
  public onProcessedLoaded(event: VertigoProcessedData) {
    this.VertigoProcessedData = event;
    if (this.flatMap(this.SelectedSeries, dt => dt.Columns).length === 0) {
      let spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(0, 3);
      spec.Types = [spec.Types[1]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.SelectedSeries);
    }
  }

  public loading(event: number) {
    this.Progress = Math.round(event * 100.0);
  }
}
