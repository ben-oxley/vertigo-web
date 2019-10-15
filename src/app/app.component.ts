import { Component, SimpleChanges, Input } from '@angular/core';
import { VertigoRawData, VertigoProcessedData } from './processing/vertigo-data';
import { DataType } from './processing/datatype';
import { Data } from './processing/data';
import { Dataspec } from './processing/dataspec';
import { RawData } from './processing/processes/rawdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vertigo-web';
  
}
