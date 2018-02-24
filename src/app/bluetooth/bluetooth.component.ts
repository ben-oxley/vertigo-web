import { Component, OnInit, NgZone, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Point } from '../shared/point';
import { ControlsComponent } from "app/shared/controls.component";
import { BluetoothHandler } from 'app/shared/bluetoothHandler';

@Component({
  styles: [`
  .bluetooth button{
    color:#40a0fc;
  }
  .bluetooth button:hover {
    color: blue;
  }
  .bluetooth button:disabled,
  .bluetooth button[disabled]{
    color: grey;
  }
  .serial button{
    color: LightGrey;
  }
  .serial button:hover {
    color: black;
  }
  .serial button:disabled,
  .serial button[disabled]{
    color: grey;
  }
  
`],
  templateUrl: 'bluetooth.component.html'
})



export class BluetoothComponent implements OnInit {
  public supported:boolean = false;
  public title:string = "Connected Device";


  public async connect(){
    if (this.supported){
      ControlsComponent.Instance.ConnectToBluetooth();
    }
  }

  
  ngOnInit(): void {
    if (navigator.bluetooth) {
      this.supported = true;
      console.log('bluetooth supported');
    } else {
      this.title = 'Bluetooth is not supported in your browser! Please use Chrome or Chrome for Android';
    }
  }
}
