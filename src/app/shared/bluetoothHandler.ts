import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Point } from '../shared/point';
import { Data,CalculatedData } from '../shared/data';
import { ControlsComponent } from "app/shared/controls.component";

export class BluetoothHandler{
    private static NO_CONNECTION:string = 'No device connected, click the bluetooth button to connect!';

  public deviceName:string = BluetoothHandler.NO_CONNECTION;
  //                               00001234-0000-1000-8000-00805f9b34fb
  private static service:string = 'd7a7fc0a-b32e-4bda-933f-49cbd9cfe2dc';
  //                                                   00001234-0000-1000-8000-00805f9b34fb
  private static imuQuaternionCharacteristic:string = '45ae0807-2233-4026-b264-045a933fa973';
  private data:CalculatedData;
  private static step:number = 0.0;


  public async connect(){
    if (navigator.bluetooth){
      let options:any = {
        filters: [
          {services: [BluetoothHandler.service]}
        ],
      };
      try {
        console.log('Requesting Bluetooth Device...');
        console.log('with ' + JSON.stringify(options));
        const device:BluetoothDevice = await navigator.bluetooth.requestDevice(options);
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
        this.deviceName = device.name;
        this.registerToServices(device,BluetoothHandler.service,BluetoothHandler.imuQuaternionCharacteristic,
          (event:any)=>{
            try {
              console.log(event.target.value.getFloat32(0,true));
              console.log(event.target.value.getFloat32(4,true));
              console.log(event.target.value.getFloat32(8,true));
              console.log(event.target.value.getFloat32(12,true));
            if (!ControlsComponent.Instance.getData()){
              ControlsComponent.Instance.setData(new CalculatedData());
            }
            this.data = ControlsComponent.Instance.getData();
            this.data.boardReference.newQuaternionData = true;
            //big endian by default
            let time:number = BluetoothHandler.step+=0.001;
            this.data.boardReference.q0.push(new Point(time,event.target.value.getFloat32(0,true)));
            this.data.boardReference.q1.push(new Point(time,event.target.value.getFloat32(4,true)));
            this.data.boardReference.q2.push(new Point(time,event.target.value.getFloat32(8,true)));
            this.data.boardReference.q3.push(new Point(time,event.target.value.getFloat32(12,true)));
            ControlsComponent.Instance.dataChanged();
            } catch(error)  {
              console.log( error);
            }
            
          }
        );
      } catch(error)  {
        console.log('Argh! ' + error);
        this.deviceName = BluetoothHandler.NO_CONNECTION;
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
}