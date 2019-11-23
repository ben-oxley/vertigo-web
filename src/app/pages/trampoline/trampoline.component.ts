import { Component, OnInit, Input } from '@angular/core';
import { VertigoRawData, VertigoProcessedData } from 'src/app/processing/vertigo-data';
import { DataType } from 'src/app/processing/datatype';
import { Dataspec } from 'src/app/processing/dataspec';

@Component({
  selector: 'app-trampoline',
  templateUrl: './trampoline.component.html',
  styleUrls: ['./trampoline.component.scss']
})
export class TrampolineComponent implements OnInit {
  @Input() Progress = 100.0;
  public VertigoRawData: VertigoRawData;
  public VertigoProcessedData: VertigoProcessedData;
  public GraphData: any;
  public SelectedValues: any = { columns: [] }
  public Graph1Series: DataType[] = Dataspec.slice(1,6,3);
  public Graph2Series: DataType[] = Dataspec.slice(1,3,3);
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
