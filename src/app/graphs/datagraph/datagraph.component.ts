import { Component, OnInit, Input, ElementRef, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../../@processing/data';

@Component({
  selector: 'data-graph',
  templateUrl: './datagraph.component.html',
  styleUrls: ['./datagraph.component.scss']
})
export class DataGraphComponent {

  @Output() data:any = [{ 
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
}