import { Component, OnInit, Input } from '@angular/core';
import { VertigoProcessedData, VertigoRawData } from 'src/app/processing/vertigo-data';
import { Dataspec } from 'src/app/processing/dataspec';
import { DataType } from 'src/app/processing/datatype';
import { Data } from '@angular/router';
import { RawData } from 'src/app/processing/processes/rawdata';

@Component({
  selector: 'app-pendulum',
  templateUrl: './pendulum.component.html',
  styleUrls: ['./pendulum.component.scss']
})
export class PendulumComponent implements OnInit {
  @Input() Progress = 100.0;
  public VertigoRawData: VertigoRawData;
  public VertigoProcessedData: VertigoProcessedData;
  public GraphData: any;
  public SelectedValues: any = { columns: [] }
  private SelectedSeries: DataType[] = [];
  constructor() { 

    const spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(6, 9);
      spec.Types = [spec.Types[1]];
      this.SelectedSeries = spec.Types;
  }

  ngOnInit() {
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

  public onLoaded(event: VertigoRawData) {
    this.VertigoRawData = event;
    if (this.flatMap(this.SelectedSeries, dt => dt.Columns).length === 0) {
      const spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(6, 9);
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
      spec.Types[1].Columns = spec.Types[1].Columns.slice(6, 9);
      spec.Types = [spec.Types[1]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.SelectedSeries);
    }
  }

  public loading(event: number) {
    this.Progress = Math.round(event * 100.0);
  }

  private flatMap<I, O>(array: Array<I>, func: (x: I) => O[]): Array<O> {
    let concatArray: Array<O> = [];
    array.map(func).forEach(set => concatArray = concatArray.concat(set));
    return concatArray;
  }


}
