import { Component, OnInit, Input, ElementRef, Output, SimpleChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../../processing/data';

@Component({
  selector: 'data-graph',
  templateUrl: './datagraph.component.html',
  styleUrls: ['./datagraph.component.scss']
})
export class DataGraphComponent {

  @Input() InputData: any = [];

  private configOptions: any = {
    type: 'scatter',
    mode: 'lines+points',
    marker: { color: 'red' },
  };

  private seriesColours: string[] = ['red', 'green', 'blue'];

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
    plot_bgcolor: "#FFF3",
    paper_bgcolor: "#FFF3",
    font: { color: '#afafaf' },
    margin: {
      l: 50,
      r: 10,
      b: 50,
      t: 0,
      pad: 4
    },
  };

  ngOnChanges(changes: SimpleChanges) {
    let i = 0;
    if (changes.InputData.currentValue) this.GraphData = changes.InputData.currentValue.filter(d => d != null).map(d => {
      if (d) {
        d.type = this.configOptions.type;
        d.marker = { color: this.seriesColours[i++] }
        d.mode = this.configOptions.mode;
      }
      return d;
    });
    else this.GraphData = null;

  }
}