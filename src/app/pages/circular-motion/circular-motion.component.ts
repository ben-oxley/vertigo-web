import { Component, OnInit, SimpleChanges } from '@angular/core';
import { VertigoRawData } from '../../@processing/vertigo-data';
import { DataType } from '../../@processing/datatype';
import { Data } from '../../@processing/data';
import { Dataspec } from '../../@processing/dataspec';

@Component({
  selector: 'circular-motion',
  templateUrl: './circular-motion.component.html',
  styleUrls: ['./circular-motion.component.scss']
})
export class CircularMotionComponent implements OnInit {
  
  public VertigoRawData:VertigoRawData;
  public GraphData:any;
  public SelectedValues:any = {columns:[]}
  private SelectedSeries:DataType[] = [];

  ngOnInit(): void {
    
  }

  public constructor(){
    this.GraphData = [{
      x: Array.from(Array(100).keys()), 
      y: Array.from(Array(100).keys()).map(a=>Math.sin(a))
    }]
  }


  ngOnChanges(changes: SimpleChanges){
    console.log(this.SelectedValues);
  }

  private seriesChanged(event:DataType[]){
    this.GraphData = this.flatMap(event,dt=>{
      let data:Data[] = this.VertigoRawData.DataTypes.get(dt.Identifier).Data();
      return dt.Columns.map(c=>{
        let t0 = data[0].Data[0];
        return <any>{
          x:data.map(datum=>(datum.Data[0]-t0)/1000.0),
          y:data.map(datum=>datum.Data[c.Identifier]),
          name: c.Name,
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
    if (this.flatMap(this.SelectedSeries,dt=>dt.Columns).length==0){
      let spec:Dataspec = new Dataspec();
      spec.Types[2].Columns = spec.Types[2].Columns.slice(0,4);
      spec.Types = [spec.Types[2]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.SelectedSeries)
    }
    
  }

}
