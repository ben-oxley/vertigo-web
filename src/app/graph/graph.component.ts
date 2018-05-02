import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { FileParser } from '../shared/fileparser';
import { Data,CalculatedData, DataListener } from '../shared/data';
import { ControlsComponent } from "app/shared/controls.component";
import { Point } from 'app/shared/point';

@Component({
  templateUrl: 'graph.component.html'
})

export class GraphComponent implements OnInit, DataListener {

  public data:CalculatedData;

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  public dropdownList = [];
  public  selectedXValue = [];
  public  selectedYValues = [];
  public  xDropdownSettings = {};
  public  yDropdownSettings = {};


  // dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  // mainChart
  private text: string;



  private refreshDataOnScreen(){
          if (this.data.boardReference.newIMUData){
              this.accelerationChartData[0].data = this.data.boardReference.ax;
              this.accelerationChartData[1].data = this.data.boardReference.ay;
              this.accelerationChartData[2].data = this.data.boardReference.az;
              this.angularAccelerationChartData[0].data = this.data.boardReference.rx;
              this.angularAccelerationChartData[1].data = this.data.boardReference.ry;
              this.angularAccelerationChartData[2].data = this.data.boardReference.rz;
              this.accelerationChartData = this.accelerationChartData.slice();
              this.angularAccelerationChartData = this.angularAccelerationChartData.slice();
            }
            if (this.data.boardReference.newPositionData){
              this.positionChartData[0].data = this.data.boardReference.z;
              this.positionChartData = this.positionChartData.slice();
            }
            if (this.data.worldReference.newIMUData){
              this.worldReferenceAccelerationChartData[0].data = this.data.worldReference.ax;
              this.worldReferenceAccelerationChartData[1].data = this.data.worldReference.ay;
              this.worldReferenceAccelerationChartData[2].data = this.data.worldReference.az;
              this.worldReferenceAngularAccelerationChartData[0].data = this.data.worldReference.rx;
              this.worldReferenceAngularAccelerationChartData[1].data = this.data.worldReference.ry;
              this.worldReferenceAngularAccelerationChartData[2].data = this.data.worldReference.rz;
              this.worldReferenceAccelerationChartData = this.worldReferenceAccelerationChartData.slice();
              this.worldReferenceAngularAccelerationChartData = this.worldReferenceAngularAccelerationChartData.slice();
            }
           this.graphData
              //TODO - Slice is a hack that forces data re-rendering. However this can be extremely slow.
              //For now, we'll use it but we need to find a better way for chart.js to 
              //only render the changes rather than a full re-render. Look at the following for ideas
              //https://github.com/valor-software/ng2-charts/issues/291
              //This appears to be the fix:
              //https://github.com/valor-software/ng2-charts/pull/563
  }

  

  private getTimeSortedData():any{
    let data:any = this.getUniqueXDataSeries().map((t)=>{return {x:t,y:[]}});
    this.data.boardReference.ax.forEach(v=>data.find(e=>e.x===v.x).y.ax=v.y );
    this.data.boardReference.ay.forEach(v=>data.find(e=>e.x===v.x).y.ay=v.y );
    this.data.boardReference.az.forEach(v=>data.find(e=>e.x===v.x).y.az=v.y );
    this.data.boardReference.rx.forEach(v=>data.find(e=>e.x===v.x).y.rx=v.y );
    this.data.boardReference.ry.forEach(v=>data.find(e=>e.x===v.x).y.ry=v.y );
    this.data.boardReference.rz.forEach(v=>data.find(e=>e.x===v.x).y.rz=v.y );
    this.data.boardReference.x.forEach(v=>data.find(e=>e.x===v.x).y.x=v.y );
    this.data.boardReference.y.forEach(v=>data.find(e=>e.x===v.x).y.y=v.y );
    this.data.boardReference.z.forEach(v=>data.find(e=>e.x===v.x).y.z=v.y );
    this.data.boardReference.q0.forEach(v=>data.find(e=>e.x===v.x).y.q0=v.y );
    this.data.boardReference.q1.forEach(v=>data.find(e=>e.x===v.x).y.q1=v.y );
    this.data.boardReference.q2.forEach(v=>data.find(e=>e.x===v.x).y.q2=v.y );
    this.data.boardReference.q3.forEach(v=>data.find(e=>e.x===v.x).y.q3=v.y );
    let x,y,z,ax,ay,az,rx,ry,rz,q0,q1,q2,q3 = 0;
    data.forEach((e)=>{
      if (e.y.x) x = e.y.x; else e.y.x = x;
      if (e.y.y) y = e.y.y; else e.y.y = y;
      if (e.y.z) z = e.y.z; else e.y.z = z;
      if (e.y.rx) rx = e.y.rx; else e.y.rx = rx;
      if (e.y.ry) ry = e.y.ry; else e.y.ry = ry;
      if (e.y.rz) rz = e.y.rz; else e.y.rz = rz;
      if (e.y.ax) ax = e.y.ax; else e.y.ax = ax;
      if (e.y.ay) ay = e.y.ay; else e.y.ay = ay;
      if (e.y.az) az = e.y.az; else e.y.az = az;
      if (e.y.q0) q0 = e.y.q0; else e.y.q0 = q0;
      if (e.y.q1) q1 = e.y.q1; else e.y.q1 = q1;
      if (e.y.q2) q2 = e.y.q2; else e.y.q2 = q2;
      if (e.y.q3) q3 = e.y.q3; else e.y.q3 = q3;
    });
    return data;
  }

  private getUniqueXDataSeries():number[]{
    let timeValues = [];
    timeValues.concat(this.data.boardReference.ax.map((p:Point)=>p.x));
    timeValues.concat(this.data.boardReference.x.map((p:Point)=>p.x));
    timeValues.concat(this.data.boardReference.q0.map((p:Point)=>p.x));
    return Array.from(new Set(timeValues)).sort(function(a, b){return a - b});
  }

  asynchronousReadFile(inputField) {
      var fileName = inputField.files[0];
      if (!fileName) {
          alert("No file selected");
          return;
      }
      this.worldReferenceAccelerationChartData = this.create3DDataArray();
      this.accelerationChartData = this.create3DDataArray();
      this.accelerationIntegralChartData = this.create3DDataArray();
      this.angularAccelerationChartData = this.create3DDataArray();
      this.worldReferenceAngularAccelerationChartData = this.create3DDataArray();
      this.positionChartData = this.create1DDataArray();
      this.quaternionChartData = this.create4DDataArray();
      ControlsComponent.Instance.setData(new CalculatedData());
      this.data = ControlsComponent.Instance.getData();
      var reader = new FileReader();
      reader.onload = file => {
          var contents: any = file.target;
          var fileText:string = contents.result;
          console.log("Loaded file");
          let fp:FileParser = new FileParser();
          var callback:Function = (l)=>{
            this.data.loadData(l);
            ControlsComponent.Instance.dataChanged();
          }
          var stringLoader:Function = FileParser.parseLines(callback);
          fileText.split('\n').forEach(line=>{
            stringLoader(line+'\n');
          });
          // var fileArray:string[] = fileText.split('\n');
          // this.runSlowly((l)=>stringLoader(l+'\n'),fileArray,0);
          console.log('Finished loading file');
        };
      reader.readAsText(fileName);
      
  }


  private runSlowly(callback:Function,filearray:string[],line){
      callback(filearray[line]);
      var ref = this;
      if (line<filearray.length-1){
          setTimeout(()=>ref.runSlowly(callback,filearray,line+1),10);
      }
  }

  public triggerFile(fileInput:Element) {
    this.asynchronousReadFile(fileInput);
  }

  public graphData:Array<any> = this.create1DDataArray();
  
  public worldReferenceAccelerationChartData: Array<any> = this.create3DDataArray();
  public accelerationChartData: Array<any> = this.create3DDataArray();
  public accelerationIntegralChartData: Array<any> = this.create3DDataArray();
  public angularAccelerationChartData: Array<any> = this.create3DDataArray();
  public worldReferenceAngularAccelerationChartData: Array<any> = this.create3DDataArray();
  public positionChartData: Array<any> = this.create1DDataArray();
  public quaternionChartData: Array<any> = this.create4DDataArray();

  public create1DDataArray():Array<any>{
    return [
    {
      data: [],
      label: 'Z'
    }
    ];
  }

  public create3DDataArray():Array<any>{
    return [
    {
      data: [],
      label: 'X'
    },
    {
      data: [],
      label: 'Y'
    },
    {
      data: [],
      label: 'Z'
    }
  ];
  }

  public create4DDataArray():Array<any>{
    return [
    {
      data: [],
      label: 'Q0'
    },
    {
      data: [],
      label: 'Q1'
    },
    {
      data: [],
      label: 'Q2'
    },
    {
      data: [],
      label: 'Q3'
    }
  ];
  }
 
  public options: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0.2,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    }
  };
  public colours: Array<any> = [
    { // brandInfo
      backgroundColor: this.brandInfo,
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: this.brandSuccess,
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: this.brandDanger,
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff'
    }
  ];
  // { // grey
  //   backgroundColor: 'rgba(148,159,177,0.2)',
  //   borderColor: 'rgba(148,159,177,1)',
  //   pointBackgroundColor: 'rgba(148,159,177,1)',
  //   pointBorderColor: '#fff',
  //   pointHoverBackgroundColor: '#fff',
  //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  // },
  public legend = true;
  public type = 'scatter';

  ngOnInit(): void {
    ControlsComponent.Instance.registerDataListener(this);
    this.data = ControlsComponent.Instance.getData();
    if (this.data && this.data.boardReference){
      this.data.boardReference.newIMUData = true;
      this.data.boardReference.newPositionData = true;
      this.data.boardReference.newQuaternionData = true;
      this.data.worldReference.newIMUData = true;
      this.DataUpdated(this.data);
    }
    this.dropdownList = [
      {"id":1,"itemName":"Time"},
      {"id":2,"itemName":"X Acceleration"},
      {"id":3,"itemName":"Y Acceleration"},
      {"id":4,"itemName":"Z Acceleration"},
      {"id":5,"itemName":"X Angular Velocity"},
      {"id":6,"itemName":"Y Angular Velocity"},
      {"id":7,"itemName":"Z Angular Velocity"},
      {"id":8,"itemName":"X Position"},
      {"id":9,"itemName":"Y Position"},
      {"id":10,"itemName":"Z Position"}
    ];
    this.selectedXValue = [
      {"id":1,"itemName":"Time"}
        ];
    this.selectedYValues = [
      {"id":8,"itemName":"X Position"},
      {"id":9,"itemName":"Y Position"},
      {"id":10,"itemName":"Z Position"}
            ];
    this.xDropdownSettings = { 
              singleSelection: true, 
              text:"Select X-Axis",
              enableSearchFilter: true
            };    
    this.yDropdownSettings = { 
              singleSelection: false, 
              text:"Select Y-Axis Series",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true
            };   
  }

  public DataUpdated(data:CalculatedData){
    this.data = ControlsComponent.Instance.getData();
    this.refreshDataOnScreen();
  }

  public onItemSelect(item:any){
    this.refreshDataOnScreen();
  }


}
