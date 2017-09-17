import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData, DataListener } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  templateUrl: 'controls.component.html'
})

export class ControlsComponent implements OnInit, DataListener {


  public data:CalculatedData;

  public showWorldReferenceAngularAccelerationChartData:boolean = false;
  public showAccelerationChartData:boolean = false;
  public showWorldReferenceAccelerationChartData:boolean = false;
  public showAngularAccelerationChartData:boolean = false;
  public showPositionChartData:boolean = false;
  public showAccelerationIntegralChartData:boolean = true;

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
            
              this.accelerationChartData = this.accelerationChartData.slice();
            
            }
  }

  public accelerationChartData: Array<any> = this.create3DDataArray();

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
