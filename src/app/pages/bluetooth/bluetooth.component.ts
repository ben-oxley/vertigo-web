import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { timer } from 'rxjs';
import { LivemapComponent } from '../../maps/livemap/livemap.component';
import { VertigoRawData } from "src/app/processing/vertigo-data";
import { Dataspec } from 'src/app/processing/dataspec';
import { RawData } from 'src/app/processing/processes/rawdata';
import { Data } from 'src/app/processing/data';
import { Quat2EulData } from 'src/app/processing/processes/quat2euldata';




@Component({
  selector: 'bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.scss']
})
export class BluetoothComponent implements OnInit {

  public constructor(private zone: NgZone) {
    this.VertigoRawData.init(new Dataspec());
  }

  private static NO_CONNECTION = 'No device connected, click the bluetooth button to connect!';
  //Device information service
  private static harwareInfoServiceId = '0000180a-0000-1000-8000-00805f9b34fb';
  //Can't use this charateristic as it is on the gatt blocklist
  //https://github.com/WebBluetoothCG/registries/blob/master/gatt_blocklist.txt
  //private static serialNumberCharateristicID = '00002a25-0000-1000-8000-00805f9b34fb';
  //Firmware version 
  private static firwareRevisionCharateristicID = '00002a26-0000-1000-8000-00805f9b34fb';
  //IMU information service
  private static serviceID = 'd7a7fc0a-b32e-4bda-933f-49cbd9cfe2dc';
  // Altitude & Heading Reference System (“AHRS”)
  private static imuQuaternionCharacteristicID = '45ae0807-2233-4026-b264-045a933fa973';
  // Magnetometer/Accelerometer/Rate Gyro (“MARG”)
  private static magnetometerCharacteristicID = '45ae0807-2233-4026-b264-045a933fa974';
  // Atmospheric / Ambient sensors (“ATMO”)
  private static atmosphericCharacteristicID = '45ae0807-2233-4026-b264-045a933fa975';
  // Global Navigation Satellite System (“GNSS”)
  private static gpsCharacteristicID = 'f078622c-f2ee-4adb-896f-cef6645e1521';
  // STATUS (“STAT”)
  private static statusCharacteristicID = 'c70617b6-993d-481f-b02a-7fcfbb3d2133';
  // CONTROL (“CTRL”)
  private static controlCharacteristicID = 'c771b990-055f-11e9-8eb2-f2801f1b9fd1';
  public connected = false;
  public pause = false;
  public stop = false;
  public deviceName: string = BluetoothComponent.NO_CONNECTION;
  public supported = false;
  public title = 'Connected Device';
  private useNotifications = true;
  private device: BluetoothDevice;
  private imuQuaternionCharacteristic: BluetoothRemoteGATTCharacteristic;
  private magnetometerCharacteristic: BluetoothRemoteGATTCharacteristic;
  private gpsCharacteristic: BluetoothRemoteGATTCharacteristic;
  private statusCharacteristic: BluetoothRemoteGATTCharacteristic;
  private controlCharacteristic: BluetoothRemoteGATTCharacteristic;
  private atmosphericCharacteristic: BluetoothRemoteGATTCharacteristic;
  private serialNumberCharteristic: BluetoothRemoteGATTCharacteristic;
  private firmwareVersionCharacteristic: BluetoothRemoteGATTCharacteristic;
  public VertigoRawData: VertigoRawData = new VertigoRawData();
  public accx = 0.0;
  public accy = 0.0;
  public accz = 0.0;
  public acc2 = 0.0;
  public rotx = 0.0;
  public roty = 0.0;
  public rotz = 0.0;
  public lon = 1.0;
  public lat = 50.0;
  public alt = 0.0;
  public q0 = 0.0;
  public q1 = 0.0;
  public q2 = 0.0;
  public q3 = 0.0;
  public temp = 0.0;
  public press = 0.0;
  public humidity = 0.0;
  public quat = {q0: this.q0, q1: this.q1, q2: this.q2, q3: this.q3};
  public rot = {x: this.rotx, y: this.roty, z: this.rotz};
  public accel = {x: this.accx, y: this.accy, z: this.accz};
  public fix = 'Not detected';
  public flags = 'Not detected';
  public versionNumber = 'Not detected';
  public serialNumber = 'Not detected';
  public gpsState = 'Not detected';
  public imuState = 'Not detected';
  public atmosphericState = 'Not detected';
  public loggerState = 'Not detected';

  public graphData = [
    () => this.accx,
    () => this.accy,
    () => this.accz,
    () => this.rotx,
    () => this.roty,
    () => this.rotz,
  ];

  public static lookupLoggerState(byte): string {
    switch (byte) {
      case 0x00: return 'Unconfigured';
      case 0x01: return 'No SD card present';// (will go to “Ready” when detected and mounted)
      case 0x02: return 'Clearing SD card of previous log files';
      case 0x03: return 'Initialising';// (prepares for logging, opens log file, then moves to “Logging”)
      case 0x04: return 'Pending config';// (waiting for configuration to be updated before moving to “Ready”)
      case 0x05: return 'Ready';// (will go to “Initialising” on start request, or to “No SD” if SD card is removed)
      case 0x06: return 'Logging';// (will go to “Finalise” on stop request)
      case 0x07: return 'Finalise';// (closing file handles after end of run, will return to “Ready”)
      case 0x08: return 'Fatal error';//

    }
  }

  public static lookupGPSFix(byte): string {
    switch (byte) {
      case 0: return 'No Fix';
      case 2: return '2D Fix';
      case 3: return '3D Fix';
    }
  }

  public static lookupGPSvalidity(byte): string {
    // tslint:disable-next-line: no-bitwise
    switch (0x4 & byte) {
      case 0x00: return 'No valid time information';
      case 0x01: return 'Valid date';
      case 0x02: return 'Valid time';
      case 0x03: return 'Valid date and time';
      case 0x04: return 'Valid time of day';
      case 0x05: return 'Valid time of day';
      case 0x06: return 'Valid time of day';
      case 0x07: return 'Valid time of day';
      case 0x08: return 'Valid magnetic declination, No valid time information';
      case 0x09: return 'Valid magnetic declination and date';
      case 0x0a: return 'Valid magnetic declination and time';
      case 0x0b: return 'Valid magnetic declination, date and time';
      case 0x0c: return 'Valid magnetic declination and time of day';
      case 0x0d: return 'Valid magnetic declination and time of day';
      case 0x0e: return 'Valid magnetic declination and time of day';
      case 0x0f: return 'Valid magnetic declination and time of day';
    }
  }

  public static lookupIMUState(byte): string {
    switch (byte) {
      case 0x00: return 'Unconfigured';
      case 0x01: return 'Initialisation failed';
      case 0x02: return 'Armed';
      case 0x03: return 'Generating';
      case 0x04: return 'Finalise';
      case 0x05: return 'Calibrating';
    }
  }

  public static lookupGPSState(byte): string {
    switch (byte) {
      case 0x00: return 'Unconfigured';
      case 0x01: return 'Initialisation failed';
      case 0x02: return 'Armed';
      case 0x03: return 'Generating';
      case 0x04: return 'Finalise';
    }
  }

  public static lookupAtmosphericState(byte): string {
    switch (byte) {
      case 0x00: return 'Unconfigured';
      case 0x01: return 'Initialisation failed';
      case 0x02: return 'Armed';
      case 0x03: return 'Generating';
      case 0x04: return 'Finalise';
    }
  }

  public async reconnect(component: BluetoothComponent) {
    console.log('disconnected');
    component.deviceName = BluetoothComponent.NO_CONNECTION;
    component.connected = false;
    if (!this.stop && this.device) {
      await this.tryConnect();
    }
  }

  public async tryConnect() {
    return this.device.gatt.connect()
    .then(server => {
      this.device.addEventListener('gattserverdisconnected', () => this.reconnect(this));
      return server.getPrimaryServices();
    })
      .then(services => {
        const service: BluetoothRemoteGATTService = services.find(s => s.uuid === BluetoothComponent.serviceID);
        const deviceService: BluetoothRemoteGATTService = services.find(s => s.uuid === BluetoothComponent.harwareInfoServiceId);
        return Promise.all([
          this.registerToServices(service, BluetoothComponent.imuQuaternionCharacteristicID)
            .then(charteristic => this.imuQuaternionCharacteristic = charteristic),
          this.registerToServices(service, BluetoothComponent.magnetometerCharacteristicID)
            .then(charteristic => this.magnetometerCharacteristic = charteristic),
           this.registerToServices(service, BluetoothComponent.atmosphericCharacteristicID)
             .then(charteristic => this.atmosphericCharacteristic = charteristic).catch(error =>
              console.log("Atmospheric characteristic not present")),
          this.registerToServices(service, BluetoothComponent.gpsCharacteristicID)
            .then(charteristic => this.gpsCharacteristic = charteristic),
          this.registerToServices(service, BluetoothComponent.controlCharacteristicID)
            .then(charteristic => this.controlCharacteristic = charteristic),
          this.registerToServices(service, BluetoothComponent.statusCharacteristicID)
            .then(charteristic => this.statusCharacteristic = charteristic),
          this.registerToServices(deviceService, BluetoothComponent.firwareRevisionCharateristicID)
            .then(charteristic => this.firmwareVersionCharacteristic = charteristic),
          // this.registerToServices(deviceService, BluetoothComponent.serialNumberCharateristicID)
          //   .then(charteristic => this.serialNumberCharteristic = charteristic)
        ]);
      })
      .then(() => {
        this.stop = false;
        this.pause = false;
        this.pollforUpdates(this.magnetometerCharacteristic, this.handleMagnetometer, 1);
        if (this.atmosphericCharacteristic) this.pollforUpdates(this.atmosphericCharacteristic, this.handleAtmospheric, 1);
        this.pollforUpdates(this.gpsCharacteristic, this.handleGPS, 1000);
        this.pollforUpdates(this.statusCharacteristic, this.handleState, 1000);
        this.pollforUpdates(this.imuQuaternionCharacteristic, this.handleIMU, 1);
        //this.readOnce(this.serialNumberCharteristic, this.handleSerial);
        this.readOnce(this.firmwareVersionCharacteristic, this.handleVersion);
      })
      .catch(error => {
        console.log(error);
        this.handleBluetoothError();
      });
  }

  public async connect() {
    if (this.supported) {
      if (this.connected && this.device) {
        try {
          this.device.gatt.disconnect();
          this.handleBluetoothDisconnect(this);
          return;
        } catch (error) {
          console.log('Connection failed ' + error);
          this.handleBluetoothError();
        }
      }
      const options: RequestDeviceOptions = {
        acceptAllDevices: true,
        optionalServices: [
          BluetoothComponent.serviceID,
          BluetoothComponent.harwareInfoServiceId
        ],
        
      };
      try {
        console.log('Requesting Bluetooth Device...');
        console.log('with ' + JSON.stringify(options));
        const device: BluetoothDevice = await navigator.bluetooth.requestDevice(options);
        this.serialNumber = device.name;
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
        this.deviceName = device.name;
        this.connected = true;
        this.device = device;
        await this.tryConnect();
      } catch (error) {
        console.log('Argh! ' + error);
        this.handleBluetoothError();
      }
    }
  }

  private handleMagnetometer(component: BluetoothComponent, event: DataView) {
    const dataArray: RawData = component.VertigoRawData.DataTypes.get(Dataspec.Spec.Types.find(t => t.Id === "imu").Identifier);
    component.accx = (event.getInt16(0, true) / 1e3) * 9.81;
    component.accy = (event.getInt16(2, true) / 1e3) * 9.81;
    component.accz = (event.getInt16(4, true) / 1e3) * 9.81;
    component.acc2 = Math.sqrt(Math.pow(component.accx, 2) + Math.pow(component.accy, 2) + Math.pow(component.accz, 2));
    component.rotx = (event.getInt16(6, true));
    component.roty = (event.getInt16(8, true));
    component.rotz = (event.getInt16(10, true));
    component.accel = {x: component.accx, y: component.accy, z: component.accz};
    dataArray.Load(new Data([
      Date.now(),
      0,
      component.accx,
      component.accy,
      component.accz,
      component.rotx,
      component.roty,
      component.rotz,
      0, 0, 0, 0, 0, 0
    ]));
  }

  private handleAtmospheric(component: BluetoothComponent, event: DataView) {
    const dataArray: RawData = component.VertigoRawData.DataTypes.get(Dataspec.Spec.Types.find(t => t.Id === "atmospheric").Identifier);
    component.temp = (event.getInt16(0, true) / 1e2);
    component.humidity = (event.getInt16(2, true) / 1e2);
    component.press = (event.getInt16(4, true) / 1e1);
    dataArray.Load(new Data([
      Date.now(),
      0,
      component.press,
      component.temp,
      component.humidity
    ]));
  }

  private handleVersion(component: BluetoothComponent, event: DataView) {
    component.versionNumber = component.uintToString(event.buffer);
  }

  private handleSerial(component: BluetoothComponent, event: DataView) {
    component.serialNumber = component.uintToString(event.buffer);
  }

  private uintToString(uintArray: ArrayBuffer): string {
      return String.fromCharCode.apply(null, new Uint8Array(uintArray));
  }

  private handleIMU(component: BluetoothComponent, event: DataView) {
    const dataArray: RawData = component.VertigoRawData.DataTypes.get(Dataspec.Spec.Types.find(t => t.Id === "ahrs").Identifier);
    component.q0 = (event.getFloat32(0, true));
    component.q1 = (event.getFloat32(4, true));
    component.q2 = (event.getFloat32(8, true));
    component.q3 = (event.getFloat32(12, true));
    component.quat = {q0: component.q0, q1: component.q1, q2: component.q2, q3: component.q3};
    let arr: number[] = [component.q0, component.q1, component.q2, component.q3];
    const rpy: number[] = Quat2EulData.toEuler(arr);
    component.rot = {x:rpy[0],y:rpy[1],z:rpy[2]};
    dataArray.Load(new Data([Date.now(), 0, component.q0, component.q1, component.q2, component.q3, rpy[0], rpy[1], rpy[2]]));
  }

  private handleGPS(component: BluetoothComponent, event: DataView) {
    const dataArray: RawData = component.VertigoRawData.DataTypes.get(Dataspec.Spec.Types.find(t => t.Id === "gps").Identifier);
    component.lon = (event.getInt32(0, true) / 1e7);
    component.lat = (event.getInt32(4, true) / 1e7);
    component.alt = (event.getInt32(8, true) / 1e7);
    component.fix = BluetoothComponent.lookupGPSFix(event.getUint8(12));
    component.flags = BluetoothComponent.lookupGPSvalidity(event.getUint8(13));
    dataArray.Load(new Data([Date.now(), 0, component.lat, component.lon, component.alt, 0, 0, 0, 0, 0]));
  }

  private handleState(component: BluetoothComponent, event: DataView) {
    if (event.byteLength === 11) {
      component.versionNumber = String.fromCharCode(event.getInt8(0)) +
      String.fromCharCode(event.getInt8(1)) +
      String.fromCharCode(event.getInt8(2)) +
      String.fromCharCode(event.getInt8(3)) +
      String.fromCharCode(event.getInt8(4)) +
      String.fromCharCode(event.getInt8(5)) +
      String.fromCharCode(event.getInt8(6));
      component.loggerState = BluetoothComponent.lookupLoggerState(event.getInt8(7));
      component.imuState = BluetoothComponent.lookupIMUState(event.getInt8(8));
      component.gpsState = BluetoothComponent.lookupGPSState(event.getInt8(9));
      component.atmosphericState = BluetoothComponent.lookupAtmosphericState(event.getInt8(10));
    } else {
      component.loggerState = BluetoothComponent.lookupLoggerState(event.getInt8(0));
      component.imuState = BluetoothComponent.lookupIMUState(event.getInt8(1));
      component.gpsState = BluetoothComponent.lookupGPSState(event.getInt8(2));
      component.atmosphericState = BluetoothComponent.lookupAtmosphericState(event.getInt8(3));
    }
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

  public calibrate() {
    this.stop = true;
    if (this.device.gatt.connected) {
      this.controlCharacteristic.writeValue(new Uint8Array([0b00001000])).catch(error => {
        console.log(error);
        this.handleBluetoothError();
      });
    }
  }

  private readOnce(charateristic: BluetoothRemoteGATTCharacteristic, handler: Function) {
    try {
      if (this.device.gatt.connected) {
        charateristic.readValue()
          .then((v) => {
            handler(this, v);
          })
          .catch(error => {
            console.log(error);
            this.handleBluetoothError();
          });
      } else {
        this.handleBluetoothError();
      }
    } catch (error) {
      console.log('Argh! ' + error);
      this.handleBluetoothError();
    }
  }

  private pollforUpdates(charateristic: BluetoothRemoteGATTCharacteristic, handler: Function, delay: number) {
    try {
      if (this.device.gatt.connected) {
        if (this.useNotifications) {
          const controller: BluetoothComponent = this;
          charateristic.oncharacteristicvaluechanged = (e) => {
            if (this.pause) { return; }
            const evt: any = e.target;
            const data: DataView = evt.value;
            controller.zone.run(() => handler(controller, data));
          };
          charateristic.startNotifications();
          return;
        }
        this.connected = true;
        if (this.pause) {
          timer(1000).subscribe(() => this.pollforUpdates(charateristic, handler, delay));
          return;
        }
        charateristic.readValue()
          .then((v) => {
            handler(this, v);
          }).then(() => timer(delay).subscribe(() => this.pollforUpdates(charateristic, handler, delay)))
          .catch(error => {
            console.log(error);
            this.handleBluetoothError();
          });
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
    return service.getCharacteristic(charteristicID).catch(e => {
      throw new Error("Cannot get charateristic " + charteristicID);
    });
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
