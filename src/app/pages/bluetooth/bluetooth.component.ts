import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { timer } from 'rxjs';
import { LivemapComponent } from '../../maps/livemap/livemap.component'
import { CubismComponent } from '../../graphs/cubism/cubism.component'
import * as cubism from 'cubism';
import * as d3 from 'd3';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { MethodFn } from '@angular/core/src/reflection/types';

@Component({
  selector: 'bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.scss']
})
export class BluetoothComponent implements OnInit {

  private static NO_CONNECTION: string = 'No device connected, click the bluetooth button to connect!';
  public connected: boolean = false;
  public pause: boolean = false;
  public stop: boolean = false;
  public deviceName: string = BluetoothComponent.NO_CONNECTION;
  public supported: boolean = false;
  public title: string = "Connected Device";
  private static serviceID: string = 'd7a7fc0a-b32e-4bda-933f-49cbd9cfe2dc';
  //Altitude & Heading Reference System (“AHRS”)
  private static imuQuaternionCharacteristicID: string = '45ae0807-2233-4026-b264-045a933fa973';
  //Magnetometer/Accelerometer/Rate Gyro (“MARG”)
  private static magnetometerCharacteristicID: string = '45ae0807-2233-4026-b264-045a933fa974';
  //Global Navigation Satellite System (“GNSS”)
  private static gpsCharacteristicID: string = 'f078622c-f2ee-4adb-896f-cef6645e1521';
  //STATUS (“STAT”)
  private static statusCharacteristicID: string = 'c70617b6-993d-481f-b02a-7fcfbb3d2133';
  // CONTROL (“CTRL”)
  private static controlCharacteristicID: string = 'c771b990-055f-11e9-8eb2-f2801f1b9fd1';
  private static batteryID: string = 'battery_service';
  private static levelCharateristicID: string = 'battery_level'
  private server: BluetoothRemoteGATTServer;
  private device: BluetoothDevice;
  private service: BluetoothRemoteGATTService;
  private imuQuaternionCharacteristic: BluetoothRemoteGATTCharacteristic;
  private magnetometerCharacteristic: BluetoothRemoteGATTCharacteristic;
  private gpsCharacteristic: BluetoothRemoteGATTCharacteristic;
  private statusCharacteristic: BluetoothRemoteGATTCharacteristic;
  private controlCharacteristic: BluetoothRemoteGATTCharacteristic;
  private cubismContext: any;



  private static step: number = 0.0;
  public accx: number = 0.0;
  public accy: number = 0.0;
  public accz: number = 0.0;
  public rotx: number = 0.0;
  public roty: number = 0.0;
  public rotz: number = 0.0;
  public lon: number = 1.0;
  public lat: number = 50.0;
  public alt: number = 0.0;
  public q0: number = 0.0;
  public q1: number = 0.0;
  public q2: number = 0.0;
  public q3: number = 0.0;
  public fix: string = "Not detected";
  public flags: string = "Not detected";
  public versionNumber: string = "Not detected";
  public gpsState: string = "Not detected";
  public imuState: string = "Not detected";
  public atmosphericState: string = "Not detected";
  public loggerState: string = "Not detected";

  public constructor() {
  }


  public async connect() {
    if (this.supported) {
      if (this.connected && this.device) {
        try {
          this.device.gatt.disconnect();
          this.handleBluetoothDisconnect(this);
          return;
        } catch (error) {
          console.log('Argh! ' + error);
          this.handleBluetoothError();
        }
      }
      let options: RequestDeviceOptions = {
        // filters: [
        //   {services: [BluetoothComponent.batteryID]}
        // ],
        acceptAllDevices: true,
        optionalServices: [
          BluetoothComponent.serviceID
        ]
      };
      try {
        console.log('Requesting Bluetooth Device...');
        console.log('with ' + JSON.stringify(options));
        const device: BluetoothDevice = await navigator.bluetooth.requestDevice(options);
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
        this.deviceName = device.name;
        this.connected = true;
        this.device = device;
        device.gatt.connect().then(server => {
          this.device.addEventListener('gattserverdisconnected', () => this.handleBluetoothDisconnect(this));
          this.server = server;
          return server.getPrimaryService(BluetoothComponent.serviceID);
        })
          .then(service => {
            return Promise.all([
              this.registerToServices(service, BluetoothComponent.imuQuaternionCharacteristicID)
                .then(charteristic => this.imuQuaternionCharacteristic = charteristic),
              this.registerToServices(service, BluetoothComponent.magnetometerCharacteristicID)
                .then(charteristic => this.magnetometerCharacteristic = charteristic),
              this.registerToServices(service, BluetoothComponent.gpsCharacteristicID)
                .then(charteristic => this.gpsCharacteristic = charteristic),
              this.registerToServices(service, BluetoothComponent.controlCharacteristicID)
                .then(charteristic => this.controlCharacteristic = charteristic),
              this.registerToServices(service, BluetoothComponent.statusCharacteristicID)
                .then(charteristic => this.statusCharacteristic = charteristic),
            ])
          })
          .then(() => {
            this.stop = false;
            this.pause = false;
            this.pollforUpdates(this.magnetometerCharacteristic, this.handleMagnetometer, 1);
            this.pollforUpdates(this.gpsCharacteristic, this.handleGPS, 1000);
            this.pollforUpdates(this.statusCharacteristic, this.handleState, 1000);
            this.pollforUpdates(this.imuQuaternionCharacteristic, this.handleIMU, 1);
          })
          .catch(error => {
            console.log(error);
            this.handleBluetoothError();
          })

      } catch (error) {
        console.log('Argh! ' + error);
        this.handleBluetoothError();
      }
    }
  }

  private handleMagnetometer(component: BluetoothComponent, event: DataView) {
    component.accx = (event.getInt16(0, true) / 1e3) * 9.81;
    component.accy = (event.getInt16(2, true) / 1e3) * 9.81;
    component.accz = (event.getInt16(4, true) / 1e3) * 9.81;
    component.rotx = (event.getInt16(6, true));
    component.roty = (event.getInt16(8, true));
    component.rotz = (event.getInt16(10, true));
  }

  private handleIMU(component: BluetoothComponent, event: DataView) {
    component.q0 = (event.getFloat32(0, true));
    component.q1 = (event.getFloat32(4, true));
    component.q2 = (event.getFloat32(8, true));
    component.q3 = (event.getFloat32(12, true));
  }

  private handleGPS(component: BluetoothComponent, event: DataView) {
    component.lon = (event.getInt32(0, true) / 1e7);
    component.lat = (event.getInt32(4, true) / 1e7);
    component.alt = (event.getInt32(8, true) / 1e7);
    component.fix = this.lookupGPSFix(event.getUint8(12));
    component.flags = this.lookupGPSvalidity(event.getUint8(13));
  }

  private handleState(component: BluetoothComponent, event: DataView) {
    component.versionNumber = String.fromCharCode(event.getInt8(0)) +
      String.fromCharCode(event.getInt8(1)) +
      String.fromCharCode(event.getInt8(2)) +
      String.fromCharCode(event.getInt8(3)) +
      String.fromCharCode(event.getInt8(4)) +
      String.fromCharCode(event.getInt8(5)) +
      String.fromCharCode(event.getInt8(6));

    component.loggerState = this.lookupLoggerState(event.getInt8(7));
    component.imuState = this.lookupIMUState(event.getInt8(8));
    component.gpsState = this.lookupGPSState(event.getInt8(9));
    component.atmosphericState = this.lookupAtmosphericState(event.getInt8(10));
  }

  public startLogging() {
    this.pause = false;
    this.stop = false;
    if (this.device.gatt.connected) {
      this.controlCharacteristic.writeValue(new Uint8Array([0x01])).catch(error => {
        console.log(error);
        this.handleBluetoothError();
      });
    }
  }

  private lookupLoggerState(byte): string {
    switch (byte) {
      case 0x00: return "Unconfigured";
      case 0x01: return "No SD card present";
      case 0x02: return "Clearing SD card of previous log files";
      case 0x03: return "Ready";
      case 0x04: return "Initialising";
      case 0x05: return "Logging";
      case 0x06: return "Finalising";
      case 0x07: return "Fatal error";
    }
  }

  private lookupGPSFix(byte): string {
    switch (byte) {
      case 0: return "No Fix";
      case 2: return "2D Fix";
      case 3: return "3D Fix";
    }
  }

  private lookupGPSvalidity(byte): string {
    switch (0x4 & byte) {
      case 0x00: return "No valid time information";
      case 0x01: return "Valid date";
      case 0x02: return "Valid time";
      case 0x03: return "Valid date and time";
      case 0x04: return "Valid time of day";
      case 0x05: return "Valid time of day";
      case 0x06: return "Valid time of day";
      case 0x07: return "Valid time of day";
      case 0x08: return "Valid magnetic declination, No valid time information";
      case 0x09: return "Valid magnetic declination and date";
      case 0x0a: return "Valid magnetic declination and time";
      case 0x0b: return "Valid magnetic declination, date and time";
      case 0x0c: return "Valid magnetic declination and time of day";
      case 0x0d: return "Valid magnetic declination and time of day";
      case 0x0e: return "Valid magnetic declination and time of day";
      case 0x0f: return "Valid magnetic declination and time of day";
    }
  }

  private lookupIMUState(byte): string {
    switch (byte) {
      case 0x00: return "Unconfigured";
      case 0x01: return "Initialisation failed";
      case 0x02: return "Armed";
      case 0x03: return "Generating";
      case 0x04: return "Finalise";
    }
  }

  private lookupGPSState(byte): string {
    switch (byte) {
      case 0x00: return "Unconfigured";
      case 0x01: return "Initialisation failed";
      case 0x02: return "Armed";
      case 0x03: return "Generating";
      case 0x04: return "Finalise";
    }
  }

  private lookupAtmosphericState(byte): string {
    switch (byte) {
      case 0x00: return "Unconfigured";
      case 0x01: return "Initialisation failed";
      case 0x02: return "Armed";
      case 0x03: return "Generating";
      case 0x04: return "Finalise";
    }
  }

  public pauseLogging() {
    this.pause = !this.pause;
  }

  public stopLogging() {
    this.stop = true;
    if (this.device.gatt.connected) {
      this.controlCharacteristic.writeValue(new Uint8Array([0x02])).catch(error => {
        console.log(error);
        this.handleBluetoothError();
      });
    }
  }



  private pollforUpdates(charateristic: BluetoothRemoteGATTCharacteristic, handler: Function, delay: number) {
    try {
      if (this.device.gatt.connected) {
        this.connected = true;
        if (this.pause) {
          timer(1000).subscribe(() => this.pollforUpdates(charateristic, handler, delay));
          return;
        };
        charateristic.readValue()
          .then((v) => {
            handler(this, v)
          }).then(() => timer(delay).subscribe(() => this.pollforUpdates(charateristic, handler, delay)))
          .catch(error => {
            console.log(error);
            this.handleBluetoothError();
          })
      } else {
        this.handleBluetoothError();
      }
    } catch (error) {
      console.log('Argh! ' + error);
      this.handleBluetoothError();
    }
  }

  private handleBluetoothError() {
    this.handleBluetoothDisconnect(this);
  }

  private handleBluetoothDisconnect(component: BluetoothComponent) {
    console.log('disconnected');
    component.deviceName = BluetoothComponent.NO_CONNECTION;
    component.stop = true;
    component.connected = false;
  }


  public async registerToServices(service: BluetoothRemoteGATTService, charteristicID: string): Promise<BluetoothRemoteGATTCharacteristic> {
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