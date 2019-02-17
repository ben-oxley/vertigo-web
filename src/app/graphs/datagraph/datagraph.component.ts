import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'data-graph',
  templateUrl: './datagraph.component.html',
  styleUrls: ['./datagraph.component.scss']
})
export class DataGraphComponent {
  public graph = {
      data: [
          { x: Array.from(Array(100).keys()), y:Array.from(Array(100).keys()).map(a=>Math.sin(a)), type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
      ],
      yaxis: {
        automargin: true,
      },
      xaxis: {
        automargin: true,
      },
      layout: {autosize: true}, 
  };
}