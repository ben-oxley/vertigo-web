import { Component, ViewChild } from '@angular/core';
import { CalculatedData, DataListener, DataPointListener } from "app/shared/data";
import { BaseChartDirective } from 'ng2-charts';
import { NgModule }      from '@angular/core';
import { Chart } from 'chart.js'
import 'chartjs-plugin-annotation'

@Component({
  selector: 'app-controls',
  template: `
  <div style="height:100px; position: relative;">
    <canvas baseChart style="position: absolute; left: 0; top: 0; z-index: 0;" class="chart" [datasets]="accelerationChartData" [options]="mainChartOptions" [colors]="mainChartColours" [legend]="mainChartLegend" [chartType]="mainChartType" (chartClick)="chartClicked($event)"></canvas>
    <canvas #chartLayer height = 100px style="height:100px; width:100%; position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
  </div>
  
  <div class="row" style="padding:10px">
    <div class="col-sm-12 col-lg-12">
      <input type="range" (input)="setIndex($event.target.value)"  [min]="sliderMin" [max]="sliderMax" class="slider" id="myRange">
    </div>
  </div>
`,
styles:[`
/* The slider itself */
.slider {
  width: 100%; /* Full-width */
  height: 30px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

.btn {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  height: 30px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}
`]
})
export class ControlsComponent implements DataListener, DataPointListener  {

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  @ViewChild("chartLayer") chartLayer;

  private chartRef:BaseChartDirective;
  public static Instance: ControlsComponent;
  private data:CalculatedData;
  private dataListeners:DataListener[] = [];
  private dataPointListeners:DataPointListener[] = [];
  private index:number = 0;
  public accelerationChartData: Array<any> = this.create3DDataArray();
  public sliderMin:number=0;
  public sliderMax:number=0;
  private originalLineDraw = Chart.controllers.line.prototype.draw;
  

  constructor (){
    this.registerDataListener(this);
    this.registerDataPointListener(this);
    if (ControlsComponent.Instance == undefined){
      ControlsComponent.Instance = this;
    } else {
      throw new Error("Cannot have two instances of the ControlsComponent class.");
    }
  }

  ngOnInit(): void {
    this.registerDataListener(this);
    this.registerDataPointListener(this);
    this.data = ControlsComponent.Instance.getData();
    this.DataUpdated(this.data);
    
   
  }

  private drawLine(index: number){
    
    var chart:any = this.chart;
    let canvas = this.chartLayer.nativeElement;
    canvas.width = canvas.clientWidth;
    let ctx = canvas.getContext("2d");
    if (index) {
      // chart.options.annotation.annotations["0"].value = index;
      // chart.chart.update(0);
      var xaxis = chart.chart.scales['x-axis-1'];
      var yaxis = chart.chart.scales['y-axis-1'];
      ctx.clearRect(0,0,10000,10000);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xaxis.getPixelForValue(index), yaxis.top);
      ctx.strokeStyle = '#ff0000';
      ctx.lineTo(xaxis.getPixelForValue(index), yaxis.bottom);
      ctx.stroke();
      ctx.restore();
    }
  }

  public DataPointUpdated(index: number): void {
    this.data = ControlsComponent.Instance.getData();
    this.drawLine(this.data.boardReference.az[index].x);
    // if (this.data !== undefined){
    //   var pos = this.data.boardReference.az[index].x;
    //   this.accelerationChartData[3].data = [{x:pos,y:2},{x:pos,y:0},{x:pos,y:-2}];
    // }
    
    // this.accelerationChartData = this.accelerationChartData.slice();
  }

  public DataUpdated(data: CalculatedData): void {
    this.data = ControlsComponent.Instance.getData();
    if (this.data !== undefined){
      this.accelerationChartData[0].data = this.data.boardReference.ax;
      this.accelerationChartData[1].data = this.data.boardReference.ay;
      this.accelerationChartData[2].data = this.data.boardReference.az;
      this.accelerationChartData = this.accelerationChartData.slice();
      this.sliderMax = this.data.boardReference.ax.length - 1;
    }
  }

  public chartClicked(e:any):void {
    if(e.active.length > 0){
      
      let label = e.active[0]._index;
    
      console.log("Point: "+label);
      this.index = e.active[0]._index;
      this.DataPointUpdated(this.index);
    }
  }
  
  public getData():CalculatedData{
    return this.data;
  }
  public setData(data:CalculatedData){
    this.data = data;
    this.dataChanged();
  }
  public registerDataListener(listener:DataListener){
    this.dataListeners.push(listener);
  }
  public registerDataPointListener(listener:DataPointListener){
    this.dataPointListeners.push(listener);
  }
  public setIndex(index:number){
    this.index = index;
    this.dataPointChanged();
  }
  public dataChanged(){
    this.dataListeners.forEach(l=>l.DataUpdated(this.data));
  }
  public dataPointChanged(){
    this.dataPointListeners.forEach(l=>l.DataPointUpdated(this.index));
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
    }//,
    // {
    //   data: [{x:0,y:2},{x:0,y:-2}],
    //   label: 'Marker'
    // }
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
        radius: 0.2,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    scales: {
      xAxes: [{
        display: true,
        id:"x-axis-1"
      }],
      yAxes: [{
        display: false,
        id:"y-axis-1"
      }],
    },
    tooltips: {enabled: false},
    annotation: {
      annotations: [
        {
          drawTime: "afterDraw",
          id: "vline",
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-1",
          value: 0,
          borderColor: "black",
          borderWidth: 1
        }
      ]
    }

  };
  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';
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
  
  public mainChartLegend = false;
  public mainChartType = 'scatter';
}
