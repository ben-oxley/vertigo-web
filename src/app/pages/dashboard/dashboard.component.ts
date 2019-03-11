import { Component } from '@angular/core';
import { VertigoRawData } from '../../@processing/vertigo-data';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public VertigoRawData:VertigoRawData;
  public GraphData:any;

  public onLoaded(event:VertigoRawData){
    this.GraphData.x=[];
    this.GraphData.y=[];
  }
}
