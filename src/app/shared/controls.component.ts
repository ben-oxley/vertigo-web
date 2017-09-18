import { Component, ViewChild } from '@angular/core';
import { CalculatedData, DataListener, DataPointListener } from "app/shared/data";
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-controls',
  template: `
  <div class="chart-wrapper" style="height:100px;">
    <canvas baseChart class="chart" [datasets]="accelerationChartData" [options]="mainChartOptions" [colors]="mainChartColours" [legend]="mainChartLegend" [chartType]="mainChartType" (chartClick)="chartClicked($event)"></canvas>
  </div>
`
})
export class ControlsComponent implements DataListener, DataPointListener  {

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  private chartRef:BaseChartDirective;

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

  public DataPointUpdated(index: number): void {
    throw new Error("Method not implemented.");
  }
  public DataUpdated(data: CalculatedData): void {
    this.data = ControlsComponent.Instance.getData();
    if (this.data !== undefined){
      this.accelerationChartData[0].data = this.data.boardReference.ax;
      this.accelerationChartData[1].data = this.data.boardReference.ay;
      this.accelerationChartData[2].data = this.data.boardReference.az;
      this.accelerationChartData = this.accelerationChartData.slice();
    }
//     if(this.chart !== undefined || this.chartRef !== undefined){
//       this.chartRef = this.chart;
//       this.chartRef.ngOnDestroy();
//       this.chartRef.chart = this.chartRef.getChartBuilder(this.chartRef.ctx);
//       this.chartRef.ctx.data = this.accelerationChartData;
// }
  }

  public chartClicked(e:any):void {
    
    if(e.active.length > 0){
      
      let label = e.active[0]._index;
    
      console.log("Point: "+label);
      this.index = e.active[0]._index;
      this.DataPointUpdated(this.index);
    }}
  
  public static Instance: ControlsComponent;
  private data:CalculatedData;
  private dataListeners:DataListener[] = [];
  private dataPointListeners:DataPointListener[] = [];
  private index:number = 0;
  public accelerationChartData: Array<any> = this.create3DDataArray();

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
      data: [{x:1,y:2},{x:2,y:3}],
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
