import { Component, OnInit, NgZone, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Point } from '../shared/point';

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

  private static NO_CONNECTION:string = 'No device connected, click the bluetooth button to connect!';

  public deviceName:string = BluetoothComponent.NO_CONNECTION;
  public supported:boolean = false;
  public title:string = "Connected Device";
  private static service:string = 'D7A7FC0AB32E4BDA933F49CBD9CFE2DC';
  private static imuQuaternionCharacteristic:string = '45AE080722334026B264045A933FA973';
  private data:CalculatedData;
  private static step:number = 0.0;


  public async connect(){
    if (this.supported){
      let options:any = {
        filters: [
          {services: [BluetoothComponent.service]}
        ],
      };
      options.acceptAllDevices = true;
      try {
        console.log('Requesting Bluetooth Device...');
        console.log('with ' + JSON.stringify(options));
        const device:BluetoothDevice = await navigator.bluetooth.requestDevice(options);
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
        this.deviceName = device.name;
        this.registerToServices(device,BluetoothComponent.service,BluetoothComponent.imuQuaternionCharacteristic,
          (event:any)=>{
            if (!DashboardComponent.data){
              DashboardComponent.data = new CalculatedData();
              this.data = DashboardComponent.data;
              this.data.boardReference.newQuaternionData = true;
              //big endian by default
              let time:number = BluetoothComponent.step+=0.001;
              this.data.boardReference.q0.push(new Point(time,event.target.value.getFloat32(0,false)));
              this.data.boardReference.q1.push(new Point(time,event.target.value.getFloat32(4,false)));
              this.data.boardReference.q2.push(new Point(time,event.target.value.getFloat32(8,false)));
              this.data.boardReference.q3.push(new Point(time,event.target.value.getFloat32(12,false)));
            }
          }
        );
      } catch(error)  {
        console.log('Argh! ' + error);
        this.deviceName = BluetoothComponent.NO_CONNECTION;
      }
    }
  }
  


  public async registerToServices(device:BluetoothDevice,service:string, characteristic:string,handler:EventListener){
    device.gatt.connect()
    .then(server => {
      // Getting Service
      return server.getPrimaryService(service);
    })
    .then(service => {
      // Getting Characteristic...
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
