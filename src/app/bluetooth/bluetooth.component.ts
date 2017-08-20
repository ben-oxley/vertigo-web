import { Component, OnInit, NgZone, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Component({
  templateUrl: 'bluetooth.component.html'
})

export class BluetoothComponent implements OnInit {

  public async connect(){
    let options:any = {};
    options.acceptAllDevices = true;
    try {
      console.log('Requesting Bluetooth Device...');
      console.log('with ' + JSON.stringify(options));
      const device = await navigator.bluetooth.requestDevice(options);
  
      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);
      console.log('> Connected:        ' + device.gatt.connected);
    } catch(error)  {
      console.log('Argh! ' + error);
    }
  }

  ngOnInit(): void {

  }
}
