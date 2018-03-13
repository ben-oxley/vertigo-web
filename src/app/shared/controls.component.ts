import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { CalculatedData, DataListener, DataPointListener } from "app/shared/data";
import { BaseChartDirective } from 'ng2-charts';
import { NgModule }      from '@angular/core';
import { Chart } from 'chart.js'
import 'chartjs-plugin-annotation'
import { BluetoothHandler } from 'app/shared/bluetoothHandler';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-controls',
  template: `
  <div style="height:100px; position: relative;" [hidden]="!showGraph">
    <canvas baseChart style="position: absolute; left: 0; top: 0; z-index: 0;" class="chart" [datasets]="chartData" [options]="mainChartOptions" [colors]="mainChartColours" [legend]="mainChartLegend" [chartType]="mainChartType" (chartClick)="chartClicked($event)"></canvas>
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
  public chartData: Array<any> = this.create3DDataArray();
  public sliderMin:number=0;
  public sliderMax:number=0;
  private originalLineDraw = Chart.controllers.line.prototype.draw;
  private bluetoothHandler:BluetoothHandler = new BluetoothHandler();
  public showGraph:boolean = true;

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
    let timer = Observable.timer(10000,1);
    timer.subscribe(t=>{
      if (this.showGraph){
    //     for (let i:number = 0; i < this.accelerationChartData.length; i++){
    //       if ( this.chartData[i].data.length < this.accelerationChartData[i].data.length){
    //         while (this.chartData[i].data.length < this.accelerationChartData[i].data.length){
    //           this.chartData[i].data.push(this.accelerationChartData[i].data[this.chartData[i].data.length]);
    //         }
    //       }
    //     }
    //     this.chart.chart.update();
    //     //this.accelerationChartData[0].data.push({x:this.accelerationChartData[0].data.length,y:0});
  //   this.chart.ngOnChanges({
  //     datasets: {
  //         currentValue: this.chartData,
  //         previousValue: null,
  //         firstChange: false,
  //         isFirstChange: () => false
  //     }
  // });    
  this.chart.chart.update({
      duration: 0,
      lazy: true,
      easing: 'linear'
  })
  }
    });
    
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

  public async ConnectToBluetooth(){
    this.bluetoothHandler.connect();
  }

  public DataPointUpdated(index: number): void {
    this.data = ControlsComponent.Instance.getData();
    
    if (this.data !== undefined && index !== -1 && this.showGraph){
      try{
        this.drawLine(this.data.boardReference.ax[index].x);
      }catch(err){}
    }
    
    // this.accelerationChartData = this.accelerationChartData.slice();
  }

  public DataUpdated(data: CalculatedData): void {
    this.data = ControlsComponent.Instance.getData();
    if (this.data !== undefined && this.showGraph){
      this.accelerationChartData[0].data = this.data.boardReference.ax;
      this.accelerationChartData[1].data = this.data.boardReference.ay;
      this.accelerationChartData[2].data = this.data.boardReference.az;
      this.sliderMax = this.data.boardReference.ax.length - 1;
      if (this.sliderMax === -1){
        this.sliderMax = this.data.boardReference.rx.length - 1;
      }
      if (this.sliderMax === -1){
        this.sliderMax = this.data.boardReference.x.length - 1;
      }
      if (this.sliderMax === -1){
        this.sliderMax = this.data.boardReference.q0.length - 1;
      }
      this.setIndex(this.sliderMax);
      //this.chart.chart.update();
      // this.drawLine(this.data.boardReference.q0[this.index].x);
      for (let i:number = 0; i < this.accelerationChartData.length; i++){
        if ( this.chartData[i].data.length < this.accelerationChartData[i].data.length){
          while (this.chartData[i].data.length < this.accelerationChartData[i].data.length){
            this.chartData[i].data.push(this.accelerationChartData[i].data[this.chartData[i].data.length]);
          }
        }
        
      }
      
      //this.chart.chart.update();
      //this.accelerationChartData[0].data.push({x:this.accelerationChartData[0].data.length,y:0});
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
      label: 'ax (ms^-2)'
    },
    {
      data: [],
      label: 'ay (ms^-2)'
    },
    {
      data: [],
      label: 'az (ms^-2)'
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
