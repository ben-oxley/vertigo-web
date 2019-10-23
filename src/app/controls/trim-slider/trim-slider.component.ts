import { Component, OnInit, Input, ElementRef, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { VertigoRawData } from "src/app/processing/vertigo-data";
import { Dataspec } from 'src/app/processing/dataspec';
import { DataType } from 'src/app/processing/datatype';
import { Data } from 'src/app/processing/data';

@Component({
  selector: 'app-trim-slider',
  templateUrl: './trim-slider.component.html',
  styleUrls: ['./trim-slider.component.scss']
})
export class TrimSliderComponent implements OnChanges {

  @Input() InputData: any = [];
  @Input() data: VertigoRawData;
  private configOptions: any = {
    type: 'scatter',
    mode: 'lines+points',
    marker: { color: 'red' },
  };
  @Output() scaled: EventEmitter<boolean> = new EventEmitter<boolean>();

  private seriesColours: string[] = ['red', 'green', 'blue'];
  private t0 = 0;

  @Output() GraphData: any = [{
    x: Array.from(Array(100).keys()),
    y: Array.from(Array(100).keys()).map(a => Math.sin(a)),
    type: 'scatter',
    mode: 'lines+points',
    marker: { color: 'red' }
  }];

  public xaxis: any = {
    automargin: true,
  };
  public yaxis: any = {
    automargin: true,
  };
  public layout: any = {
    autosize: true,
    plot_bgcolor: '#FFF3',
    paper_bgcolor: '#FFF3',
    font: { color: '#afafaf' },
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0
    },
    xaxis: {
      rangeslider: {},
      showgrid: false,
    },
    yaxis: {
      fixedrange: true,
      showgrid: false,
      showticklabels: false,
    }
  };


  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
        this.onLoaded(changes.data.currentValue);
    } else {
      this.GraphData = null;
    }
  }

  public onLoaded(event: VertigoRawData) {
    this.data = event;
    let spec: Dataspec = new Dataspec();
    spec.Types[1].Columns = spec.Types[1].Columns.slice(0, 3);
    spec.Types = [spec.Types[1]];
    this.seriesChanged(spec.Types);
  }

  public seriesChanged(event: DataType[]) {
    this.GraphData = this.flatMap(event, dt => {
      if (this.data.DataTypes && this.data.DataTypes.has(dt.Identifier)) {
        let data: Data[] = this.data.DataTypes.get(dt.Identifier).Data();
        if (data && data.length > 0) {
          return dt.Columns.map(c => {
            this.t0 = data[0].Data[0];
            return {
              x: data.map(datum => (datum.Data[0] - this.t0) / 1000.0),
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

  public handleRelayout(event: any) {
    const data: any = {};
    if (event['xaxis.range[0]']) { data.xmin = (1000.0 * event['xaxis.range[0]']) + this.t0; }
    if (event['xaxis.range[1]']) { data.xmax = (1000.0 * event['xaxis.range[1]']) + this.t0; }
    if (event['xaxis.autorange']) { data.autorange = event['xaxis.autorange']; }
    this.scaled.emit(data);
  }

  private flatMap<I, O>(array: Array<I>, func: (x: I) => O[]): Array<O> {
    let concatArray: Array<O> = [];
    array.map(func).forEach(set => concatArray = concatArray.concat(set));
    return concatArray;
  }
}
