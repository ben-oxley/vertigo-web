import { Component, OnInit, Input } from '@angular/core';
import { VertigoProcessedData, VertigoRawData } from 'src/app/processing/vertigo-data';
import { Dataspec } from 'src/app/processing/dataspec';
import { DataType } from 'src/app/processing/datatype';
import { Data } from '@angular/router';
import { RawData } from 'src/app/processing/processes/rawdata';

@Component({
  selector: 'app-pendulum',
  templateUrl: './pendulum.component.html',
  styleUrls: ['./pendulum.component.scss']
})
export class PendulumComponent implements OnInit {
  @Input() Progress = 100.0;
  public VertigoRawData: VertigoRawData;
  public VertigoProcessedData: VertigoProcessedData;
  public GraphData: any;
  public SelectedValues: any = { columns: [] }
  public Graph1Series: DataType[] = Dataspec.slice(1,6,3);
  public Graph2Series: DataType[] = Dataspec.slice(1,6,1);
  constructor() { 
  }

  ngOnInit() {
  }

  public onLoaded(event: VertigoRawData) {
    this.VertigoRawData = event;
  }

  public onProcessedLoaded(event: VertigoProcessedData) {
    this.VertigoProcessedData = event;
  }

  public loading(event: number) {
    this.Progress = Math.round(event * 100.0);
  }


}
