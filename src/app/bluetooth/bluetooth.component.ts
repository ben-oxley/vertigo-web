import { Component, OnInit, NgZone, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Component({
  styles: [`
  button{
    color:#40a0fc;
  }
  button:hover {
    color: blue;
  }
  button:disabled,
  button[disabled]{
    color: grey;
  }
`],
  templateUrl: 'bluetooth.component.html'
})



export class BluetoothComponent implements OnInit {

  private static NO_CONNECTION:string = 'No device connected, click the bluetooth button to connect!';

  public deviceName:string = BluetoothComponent.NO_CONNECTION;
  public supported:boolean = false;
  public title:string = "Connected Device";

  public async connect(){
    if (this.supported){
      let options:any = {};
      options.acceptAllDevices = true;
      try {
        console.log('Requesting Bluetooth Device...');
        console.log('with ' + JSON.stringify(options));
        const device = await navigator.bluetooth.requestDevice(options);
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
        this.deviceName = device.name;
      } catch(error)  {
        console.log('Argh! ' + error);
        this.deviceName = BluetoothComponent.NO_CONNECTION;
      }
    }
  }

  public async registerToServices(device:BluetoothDevice,service:string, characteristic:string,handler:EventListenerObject){
    device.gatt.connect()
    .then(server => {
      // Getting Battery Service...
      return server.getPrimaryService(service);
    })
    .then(service => {
      // Getting Battery Level Characteristic...
      return service.getCharacteristic(characteristic);
    })
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
      characteristic.addEventListener('characteristicvaluechanged',
      handler);
    })
    .catch(error => { console.log(error); });
    
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
