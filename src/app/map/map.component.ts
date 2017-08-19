import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  templateUrl: 'map.component.html'
})

export class MapComponent implements OnInit {


  public data:CalculatedData;

  constructor (){
    this.data = DashboardComponent.data;
  }
 

  ngOnInit(): void {

  }
}
