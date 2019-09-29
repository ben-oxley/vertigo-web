import { Component, SimpleChanges, Input } from '@angular/core';
import { VertigoRawData, VertigoProcessedData } from './processing/vertigo-data';
import { DataType } from './processing/datatype';
import { Data } from './processing/data';
import { Dataspec } from './processing/dataspec';
import { RawData } from './processing/processes/rawdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vertigo-web';
  @Input() Progress = 100.0;
  public VertigoRawData: VertigoRawData;
  public VertigoProcessedData: VertigoProcessedData;
  public GraphData: any;
  public SelectedValues: any = { columns: [] }
  private SelectedSeries: DataType[] = [];

  public constructor() {
    this.GraphData = [{
      x: Array.from(Array(100).keys()),
      y: Array.from(Array(100).keys()).map(a => Math.sin(a))
    }]
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(this.SelectedValues);
  }

  public seriesChanged(event: DataType[]) {
    this.GraphData = this.flatMap(event, dt => {
      if (this.VertigoRawData.DataTypes && this.VertigoRawData.DataTypes.has(dt.Identifier)) {
        const data: Data[] = RawData.Cast(this.VertigoRawData.DataTypes.get(dt.Identifier)).Data();
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
