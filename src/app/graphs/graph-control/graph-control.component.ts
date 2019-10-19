import { Component, Input } from '@angular/core';
import { VertigoRawData, VertigoProcessedData } from '../../processing/vertigo-data';
import { DataType } from '../../processing/datatype';
import { Data } from '../../processing/data';
import { Dataspec } from '../../processing/dataspec';
import { RawData } from 'src/app/processing/processes/rawdata';

@Component({
  selector: 'graph-control',
  templateUrl: './graph-control.component.html',
})
export class GraphControlComponent {

  public GraphData: any;
  private vertigoRawData: VertigoRawData;
  private vertigoProcessedData: VertigoProcessedData;
  private selectedSeries: DataType[] = [];

  public constructor() {
    this.GraphData = [{
    }];
  }

  @Input() set RawData(vertigoRawData: VertigoRawData) {
    this.onLoaded(vertigoRawData);
  }

  @Input() set ProcessedData(vertigoProcessedData: VertigoProcessedData) {
    this.onProcessedLoaded(vertigoProcessedData);
  }

  @Input() set SelectedSeries(selectedSeries: DataType[]) {
    this.selectedSeries = selectedSeries;
    this.seriesChanged(selectedSeries);
  }

  public seriesChanged(event: DataType[]) {
    if (this.vertigoRawData){
      this.GraphData = this.flatMap(event, dt => {
        if (this.vertigoRawData.DataTypes && this.vertigoRawData.DataTypes.has(dt.Identifier)) {
          const data: Data[] = RawData.Cast(this.vertigoRawData.DataTypes.get(dt.Identifier)).Data();
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
    }
    return;
  }

  private flatMap<I, O>(array: Array<I>, func: (x: I) => O[]): Array<O> {
    let concatArray: Array<O> = [];
    array.map(func).forEach(set => concatArray = concatArray.concat(set));
    return concatArray;
  }


  public onLoaded(event: VertigoRawData) {
    this.vertigoRawData = event;
    if (this.flatMap(this.selectedSeries, dt => dt.Columns).length === 0) {
      const spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(0, 3);
      spec.Types = [spec.Types[1]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.selectedSeries);
    }
  }

  public onProcessedLoaded(event: VertigoProcessedData) {
    this.vertigoProcessedData = event;
    if (this.flatMap(this.selectedSeries, dt => dt.Columns).length === 0) {
      const spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(0, 3);
      spec.Types = [spec.Types[1]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.selectedSeries);
    }
  }
}
