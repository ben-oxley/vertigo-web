import { Component, OnInit, Input, ElementRef, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../../processing/data';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'data-graph',
  templateUrl: './datagraph.component.html',
  styleUrls: ['./datagraph.component.scss']
})
export class DataGraphComponent implements OnChanges {

  @Input() InputData: any = [];

  @Output() afterPlot: EventEmitter<any> = new EventEmitter<any>();

  private graph:PlotlyModule

  private configOptions: any = {
    type: 'scattergl',
    mode: 'lines',
    marker: { color: 'red' },
  };

  private seriesColours: string[] = ['red', 'green', 'blue'];

  @Output() GraphData: any = [{
    x: Array.from(Array(100).keys()),
    y: Array.from(Array(100).keys()).map(a => Math.sin(a)),
    type: 'scattergl',
    mode: 'lines',
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
    height: 400, 
    plot_bgcolor: '#FFF3',
    paper_bgcolor: '#FFF3',
    font: { color: '#afafaf' },
    hovermode: false,
    showlegend: true,
    legend: {"orientation": "h"},
    margin: {
      l: 50,
      r: 10,
      b: 50,
      t: 0,
      pad: 4
    },
    xaxis: {
      title: {
        text: 'Time',
      },
    },
    yaxis: {
      title: {
        text: ''
      }
    }
  };
  public config:any={
    linkText: 'Edit graph',
    showLink: true,
    responsive: true
  }

  @Input() setXAxis(label:String){
    this.layout.xaxis.title.text = label;
  }

  @Input() setYAxis(label:String){
    this.layout.yaxis.title.text = label;
  }

  onPlot(){
    this.afterPlot.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    let i = 0;
    if (changes.InputData.currentValue) {
      this.GraphData = changes.InputData.currentValue.filter(d => d != null).map(d => {
        if (d) {
          d.type = this.configOptions.type;
          d.marker = {
            color: this.seriesColours[i++]
          };
          d.mode = this.configOptions.mode;
        }
        return d;
      });
    } else {
      this.GraphData = null;
    }
  }
}
