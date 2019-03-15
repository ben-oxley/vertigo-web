import { Component } from '@angular/core';
import { VertigoRawData } from '../../@processing/vertigo-data';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public VertigoRawData:VertigoRawData;
  public GraphData:any;

  public constructor(){
    this.GraphData = [{
      x: Array.from(Array(100).keys()), 
      y: Array.from(Array(100).keys()).map(a=>Math.sin(a))
    }]
  }

  public onLoaded(event:VertigoRawData){
    let time:any = event.DataTypes.get(2).Data().map(d=>d.Data[0]);
    this.GraphData= [{
      x:time,
      y:event.DataTypes.get(2).Data().map(d=>d.Data[2])
    },
    {
      x:time,
      y:event.DataTypes.get(2).Data().map(d=>d.Data[3])
    },
    {
      x:time,
      y:event.DataTypes.get(2).Data().map(d=>d.Data[4])
    }]
  }
}
