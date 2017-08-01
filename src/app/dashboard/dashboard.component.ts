import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { FileParser } from '../shared/fileparser';

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

  // mainChart
  private text: string;

  readSingleFile(inputField) {
      var fileName = inputField.files[0];
      if (!fileName) {
          alert("No file selected");
          return;
      }
      var reader = new FileReader();
      reader.onload = file => {
          var contents: any = file.target;
          this.text = contents.result;
          console.log("Loaded file");
          let fp:FileParser = new FileParser();
          var parsedFile = fp.parseFile(this.text);
          var ax:any = fp.parseArray(parsedFile,2,1);
          var ay:any = fp.parseArray(parsedFile,2,2);
          var az:any = fp.parseArray(parsedFile,2,3);
          var iax:any = this.integrate(ax);
          var iay:any = this.integrate(ay);
          var iaz:any = this.integrate(az);
          var rx:any = fp.parseArray(parsedFile,2,4);
          var ry:any = fp.parseArray(parsedFile,2,5);
          var rz:any = fp.parseArray(parsedFile,2,6);
          var x:any = fp.parseArray(parsedFile,1,1);
          var y:any = fp.parseArray(parsedFile,1,2);
          var z:any = fp.parseArray(parsedFile,1,3);
          this.accelerationChartData = [
            {
              data: ax,
              label: 'X'
            },
            {
              data: ay,
              label: 'Y'
            },
            {
              data: az,
              label: 'Z'
            }
          ];
          this.accelerationIntegralChartData = [
            {
              data: iax,
              label: 'X'
            },
            {
              data: iay,
              label: 'Y'
            },
            {
              data: iaz,
              label: 'Z'
            }
          ];
          this.rotationChartData = [
            {
              data: rx,
              label: 'X'
            },
            {
              data: ry,
              label: 'Y'
            },
            {
              data: rz,
              label: 'Z'
            }
          ];
          this.positionChartData = [
            {
              data: z,
              label: 'Z'
            }
          ];
        };
      reader.readAsText(fileName);
  }

  private integrate(any:any):any{
    var lastX:number = any[0].x;
    var lastY:number = any[0].y;
    var output = [];
    var last:number = 0;
    any.forEach(element => {
      var diff:number = ((parseFloat(element.y)+lastY)*(parseFloat(element.x)-lastX)/2.0);
      if (isNaN(diff)){
        diff = 0;
      }
      output.push({x:element.x,y:last+diff});
      last = last+diff;
      lastX = parseFloat(element.x);
      lastY = parseFloat(element.y);
    });
    return output;
  }

  public triggerFile(fileInput:Element) {
    this.readSingleFile(fileInput);
  }

  public ax: Array<number> = [];
  public ay: Array<number> = [];
  public az: Array<number> = [];

  public accelerationChartData: Array<any> = [
    {
      data: this.ax,
      label: 'X'
    },
    {
      data: this.ay,
      label: 'Y'
    },
    {
      data: this.az,
      label: 'Z'
    }
  ];
  public accelerationIntegralChartData: Array<any> = [
    {
      data: this.ax,
      label: 'X'
    },
    {
      data: this.ay,
      label: 'Y'
    },
    {
      data: this.az,
      label: 'Z'
    }
  ];
  public rotationChartData: Array<any> = [
    {
      data: this.ax,
      label: 'X'
    },
    {
      data: this.ay,
      label: 'Y'
    },
    {
      data: this.az,
      label: 'Z'
    }
  ];
  public positionChartData: Array<any> = [
    {
      data: this.az,
      label: 'Z'
    }
  ];
 
  public mainChartOptions: any = {
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
  public mainChartLegend = true;
  public mainChartType = 'scatter';

  ngOnInit(): void {

  }
}
