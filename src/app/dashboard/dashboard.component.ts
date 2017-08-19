import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { FileParser } from '../shared/fileparser';
import { Data,CalculatedData, DataListener } from '../shared/data';

@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, DataListener {

  public static data:CalculatedData;

  public data:CalculatedData;

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  // dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
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
           
              //TODO - Slice is a hack that forces data re-rendering. However this can be extremely slow.
              //For now, we'll use it but we need to find a better way for chart.js to 
              //only render the changes rather than a full re-render. Look at the following for ideas
              //https://github.com/valor-software/ng2-charts/issues/291
              //This appears to be the fix:
              //https://github.com/valor-software/ng2-charts/pull/563
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
      DashboardComponent.data = new CalculatedData();
      this.data = DashboardComponent.data;
      var reader = new FileReader();
      reader.onload = file => {
          var contents: any = file.target;
          var fileText:string = contents.result;
          console.log("Loaded file");
          let fp:FileParser = new FileParser();
          var callback:Function = (l)=>{
            this.data.loadData(l);
            this.refreshDataOnScreen();
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
 
  public mainChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public mainChartLegend = true;
  public mainChartType = 'scatter';

  ngOnInit(): void {
    
    this.data = DashboardComponent.data;
    if (this.data && this.data.boardReference){
      this.data.boardReference.newIMUData = true;
      this.data.boardReference.newPositionData = true;
      this.data.boardReference.newQuaternionData = true;
      this.data.worldReference.newIMUData = true;
      this.DataUpdated(this.data);
    }
  }

  public DataUpdated(data:CalculatedData){
    this.refreshDataOnScreen();
  }
}
