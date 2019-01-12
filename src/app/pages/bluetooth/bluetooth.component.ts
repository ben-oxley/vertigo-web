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
          this.imuQuaternionCharacteristic.addEventListener('characteristicvaluechanged',this.handleIMU);
          this.magnetometerCharacteristic.addEventListener('characteristicvaluechanged',this.handleMagnetometer);
          this.gpsCharacteristic.addEventListener('characteristicvaluechanged',this.handleGPS)
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

  private handleBattery(event){
    console.log(
      event.target.value.getUint8(0)
    );
  }

  private handleMagnetometer(event) {
    console.log(
      event.target.value.getInt16(0,true),
      event.target.value.getInt16(2,true),
      event.target.value.getInt16(4,true),
      event.target.value.getInt16(6,true),
      event.target.value.getInt16(8,true),
      event.target.value.getInt16(10,true),
      );
  }

  private handleIMU(event) {
    console.log(
      event.target.value.getFloat32(0,true),
      event.target.value.getFloat32(4,true),
      event.target.value.getFloat32(8,true),
      event.target.value.getFloat32(12,true),
      );
  }

  private handleGPS(event) {
    let lon:number = event.target.value.getInt32(0,true)/1e7;
    let lat:number = event.target.value.getInt32(4,true)/1e7;
    let alt:number = event.target.value.getInt32(8,true)/1e7;
    console.log(
      lon,
      lat,
      alt,
      event.target.value.getUint8(12,true)/1e3,
      );
  }
  
  
  private pollforUpdates(){
    try{
      if (this.device.gatt.connected){

        this.magnetometerCharacteristic.readValue();
        this.imuQuaternionCharacteristic.readValue();
        this.gpsCharacteristic.readValue();
        timer(1000).subscribe(()=>this.pollforUpdates());
      } else {
        this.deviceName = BluetoothComponent.NO_CONNECTION;
      }
    } catch(error)  {
      console.log('Argh! ' + error);
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