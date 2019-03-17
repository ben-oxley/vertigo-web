import { Component, OnInit, Input, ElementRef, Output, SimpleChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../../@processing/data';

@Component({
  selector: 'data-graph',
  templateUrl: './datagraph.component.html',
  styleUrls: ['./datagraph.component.scss']
})
export class DataGraphComponent {

  @Input() InputData:any = [];

  private configOptions:any = {
    type: 'scatter', 
    mode: 'lines+points', 
    marker: {color: 'red'} ,
  };

  private seriesColours:string[]=['red','green','blue'];

  @Output() GraphData:any = [{ 
    x: Array.from(Array(100).keys()), 
    y: Array.from(Array(100).keys()).map(a=>Math.sin(a)), 
    type: 'scatter', 
    mode: 'lines+points', 
    marker: {color: 'red'} 
  }];

  public xaxis:any = {
    automargin: true,
  };
  public yaxis:any = {
    automargin: true,
  };
  public layout:any = {autosize: true};

  ngOnChanges(changes: SimpleChanges) {
    let i = 0;
    this.GraphData = changes.InputData.currentValue.map(d=>{
      d.type = this.configOptions.type;
      d.marker = {color:this.seriesColours[i++]}
      d.mode = this.configOptions.mode;
      return d;
    });
  }
}