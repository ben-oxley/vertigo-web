import { Component, OnInit, NgZone, Input} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { timer } from 'rxjs';
import { LivemapComponent } from '../../maps/livemap/livemap.component'
import { context } from 'cubism-es';

@Component({
  selector: 'bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.scss']
})
export class BluetoothComponent implements OnInit {

  private static NO_CONNECTION:string = 'No device connected, click the bluetooth button to connect!';
  public connected:boolean = false;
  public pause:boolean = false;
  public stop:boolean = false;
  public deviceName:string = BluetoothComponent.NO_CONNECTION;
  public supported:boolean = false;
  public title:string = "Connected Device";
  private static serviceID:string = 'd7a7fc0a-b32e-4bda-933f-49cbd9cfe2dc';
  //Altitude & Heading Reference System (“AHRS”)
  private static imuQuaternionCharacteristicID:string = '45ae0807-2233-4026-b264-045a933fa973';
  //Magnetometer/Accelerometer/Rate Gyro (“MARG”)
  private static magnetometerCharacteristicID:string = '45ae0807-2233-4026-b264-045a933fa974';
  //Global Navigation Satellite System (“GNSS”)
  private static gpsCharacteristicID:string = 'f078622c-f2ee-4adb-896f-cef6645e1521';
  //STATUS (“STAT”)
  private static statusCharacteristicID:string = 'c70617b6-993d-481f-b02a-7fcfbb3d2133';
  // CONTROL (“CTRL”)
  private static controlCharacteristicID:string = 'c771b990-055f-11e9-8eb2-f2801f1b9fd1';
  private static batteryID:string = 'battery_service';
  private static levelCharateristicID:string = 'battery_level'
  private server:BluetoothRemoteGATTServer;
  private device:BluetoothDevice;
  private service:BluetoothRemoteGATTService;
  private imuQuaternionCharacteristic:BluetoothRemoteGATTCharacteristic;
  private magnetometerCharacteristic:BluetoothRemoteGATTCharacteristic;
  private gpsCharacteristic:BluetoothRemoteGATTCharacteristic;
  private statusCharacteristic:BluetoothRemoteGATTCharacteristic;
  private controlCharacteristic:BluetoothRemoteGATTCharacteristic;
 
  
  private static step:number = 0.0;
  public accx:number = 0.0;
  public accy:number = 0.0;
  public accz:number = 0.0;
  public rotx:number = 0.0;
  public roty:number = 0.0;
  public rotz:number = 0.0;
  public lon:number = 0.0;
  public lat:number = 0.0;
  public alt:number = 0.0;
  public q0:number = 0.0;
  public q1:number = 0.0;
  public q2:number = 0.0;
  public q3:number = 0.0;
  public fix:number = 0;
  public flags:number = 0;

  public constructor(){
  }


  public async connect(){
    if (this.supported){
      let options:RequestDeviceOptions = {
        // filters: [
        //   {services: [BluetoothComponent.batteryID]}
        // ],
        acceptAllDevices:true,
        optionalServices: [
          BluetoothComponent.serviceID
        ]
      };
      try {
        console.log('Requesting Bluetooth Device...');
        console.log('with ' + JSON.stringify(options));
        const device:BluetoothDevice = await navigator.bluetooth.requestDevice(options);
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
        this.deviceName = device.name;
        this.connected = true;
        this.device = device;
        device.gatt.connect().then(server=>{
          this.server = server;
          return server.getPrimaryService(BluetoothComponent.serviceID);
        })
        .then(service=>{
          return Promise.all([
           this.registerToServices(service,BluetoothComponent.imuQuaternionCharacteristicID)
           .then(charteristic=>this.imuQuaternionCharacteristic = charteristic),
           this.registerToServices(service,BluetoothComponent.magnetometerCharacteristicID)
           .then(charteristic=>this.magnetometerCharacteristic = charteristic),
           this.registerToServices(service,BluetoothComponent.gpsCharacteristicID)
           .then(charteristic=>this.gpsCharacteristic = charteristic),
           this.registerToServices(service,BluetoothComponent.controlCharacteristicID)
           .then(charteristic=>this.controlCharacteristic = charteristic),
           this.registerToServices(service,BluetoothComponent.statusCharacteristicID)
           .then(charteristic=>this.statusCharacteristic = charteristic),
          ])
        })
        .then(()=>{
          this.stop = false;
          this.pause = false;
          this.pollforUpdates();
        })
        .catch(error=>{
          console.log(error);
        })
        
      } catch(error)  {
        console.log('Argh! ' + error);
        this.deviceName = BluetoothComponent.NO_CONNECTION;
        this.connected = false;
      }
    }
  }

  private handleMagnetometer(component:BluetoothComponent,event:DataView) {
    component.accx = (event.getInt16(0,true)/1e3)*9.81;
    component.accy = (event.getInt16(2,true)/1e3)*9.81;
    component.accz = (event.getInt16(4,true)/1e3)*9.81;
    component.rotx = (event.getInt16(6,true));
    component.roty = (event.getInt16(8,true));
    component.rotz = (event.getInt16(10,true));
  }

  private handleIMU(component:BluetoothComponent,event:DataView) {
    component.q0 = (event.getFloat32(0,true));
    component.q1 = (event.getFloat32(4,true));
    component.q2 = (event.getFloat32(8,true));
    component.q3 = (event.getFloat32(12,true));
  }

  private handleGPS(component:BluetoothComponent,event:DataView) {
    component.lon = (event.getInt32(0,true)/1e7);
    component.lat = (event.getInt32(4,true)/1e7);
    component.alt = (event.getInt32(8,true)/1e7);
    component.fix = event.getUint8(12);
    component.flags = 0x03&event.getUint8(13);
  }

  private startLogging(){
    this.pause= false;
    this.stop = false;
    if (this.device.gatt.connected){
      this.controlCharacteristic.writeValue(new Uint8Array([0x01])).catch(error=>{
        console.log(error);
      });
    }
  }
  
  private pauseLogging(){
    this.pause= !this.pause;
  }

  private stopLogging(){
    this.stop = true;
    if (this.device.gatt.connected){
      this.controlCharacteristic.writeValue(new Uint8Array([0x02])).catch(error=>{
        console.log(error);
      });
    }
  }
  
  private pollforUpdates(){
    try{
      if (this.device.gatt.connected){
        this.connected = true;
        if (this.pause) {
          timer(1000).subscribe(()=>this.pollforUpdates());
          return;
        };
        return Promise.all([
        this.magnetometerCharacteristic.readValue().then(m=>this.handleMagnetometer(this,m)),
        this.imuQuaternionCharacteristic.readValue().then(m=>this.handleIMU(this,m)),
        this.gpsCharacteristic.readValue().then(m=>this.handleGPS(this,m))
        ]).then(()=>timer(10).subscribe(()=>this.pollforUpdates())).catch(error=>{
          console.log(error);
        })
      } else {
        this.connected = false;
        this.deviceName = BluetoothComponent.NO_CONNECTION;
      }
    } catch(error)  {
      console.log('Argh! ' + error);
      this.connected = false;
      this.deviceName = BluetoothComponent.NO_CONNECTION;
    }
    
    
  }


  public async registerToServices(service:BluetoothRemoteGATTService, charteristicID:string):Promise<BluetoothRemoteGATTCharacteristic>{
    this.service = service;
    return service.getCharacteristic(charteristicID)
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