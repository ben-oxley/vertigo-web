import { Component, SimpleChanges } from '@angular/core';
import { VertigoRawData } from '../../@processing/vertigo-data';
import { DataType } from '../../@processing/datatype';
import { Data } from '../../@processing/data';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public VertigoRawData:VertigoRawData;
  public GraphData:any;
  public SelectedValues:any = {columns:[]}
  

  public constructor(){
    this.GraphData = [{
      x: Array.from(Array(100).keys()), 
      y: Array.from(Array(100).keys()).map(a=>Math.sin(a))
    }]
  }


  ngOnChanges(changes: SimpleChanges){
    console.log(this.SelectedValues);
  }

  public seriesChanged(event:DataType[]){
    this.GraphData = this.flatMap(event,dt=>{
      let data:Data[] = this.VertigoRawData.DataTypes.get(dt.Identifier).Data();
      return dt.Columns.map(c=>{
        return <any>{
          x:data.map(datum=>datum.Data[0]),
          y:data.map(datum=>datum.Data[c.Identifier]),
          yaxis:c.Id
        }
      });
    });
    return;
  }

  private flatMap<I,O>(array:Array<I>,func: (x: I) => O[]): Array<O>{
      let concatArray:Array<O> = [];
      array.map(func).forEach(set=>concatArray=concatArray.concat(set));
      return concatArray;
  }
  

  public onLoaded(event:VertigoRawData){
    this.VertigoRawData = event;
    let time:any = this.VertigoRawData.DataTypes.get(2).Data().map(d=>d.Data[0]);
    this.GraphData= [{
      x:time,
      y:this.VertigoRawData.DataTypes.get(2).Data().map(d=>d.Data[2])
    },
    {
      x:time,
      y:this.VertigoRawData.DataTypes.get(2).Data().map(d=>d.Data[3])
    },
    {
      x:time,
      y:this.VertigoRawData.DataTypes.get(2).Data().map(d=>d.Data[4])
    }]
  }
}
