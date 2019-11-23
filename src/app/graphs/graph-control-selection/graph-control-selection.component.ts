import { Component, SimpleChanges, Input } from '@angular/core';
import { VertigoProcessedData } from '../../processing/vertigo-data';
import { VertigoRawData } from "../../processing/vertigo-data";
import { DataType } from '../../processing/datatype';
import { Data } from '../../processing/data';
import { Dataspec } from '../../processing/dataspec';
import { RawData } from 'src/app/processing/processes/rawdata';

@Component({
  selector: 'graph-control-selection',
  templateUrl: './graph-control-selection.component.html',
})
export class GraphControlSelectionComponent {

  @Input() public VertigoRawData: VertigoRawData;
  @Input() public VertigoProcessedData: VertigoProcessedData;
  public SelectedSeries: DataType[] = [];

  public seriesChanged(event: DataType[]) {
    this.SelectedSeries = event;
  }
}
