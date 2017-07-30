import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  constructor(mainChart: ElementRef) { 
    this.mainChart = mainChart;
  }

  public mainChart : ElementRef;
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

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // mainChart

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public triggerFile(fileInput:Element) {
    this.setChartDataSeries();
  }

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'X'
    },
    {
      data: this.mainChartData2,
      label: 'Y'
    },
    {
      data: this.mainChartData3,
      label: 'Z'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
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
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
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
  public mainChartLegend = false;
  public mainChartType = 'line';

  private setChartDataSeries(){
    // generate random values for mainChart
    let _mainChartData1:Array<any> = new Array();
    let _mainChartData2:Array<any> = new Array();
    let _mainChartData3:Array<any> = new Array();
    for (let i = 0; i <= this.mainChartElements; i++) {
      _mainChartData1.push(this.random(50, 200));
      _mainChartData2.push(this.random(80, 100));
      _mainChartData3.push(this.random(80, 100));
    }
    this.mainChartData = [
    {
      data: _mainChartData1,
      label: 'X'
    },
    {
      data: _mainChartData2,
      label: 'Y'
    },
    {
      data: _mainChartData3,
      label: 'Z'
    }
  ];
    this.mainChartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  ngOnInit(): void {
    this.setChartDataSeries();
  }
}
