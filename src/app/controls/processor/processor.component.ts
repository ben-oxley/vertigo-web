import { Component, OnInit } from '@angular/core';
import { DataType } from 'src/app/processing/datatype';
import { VertigoDataStoreManager } from 'src/app/processing/VertigoDataStoreManager';
import { VertigoDataStore } from 'src/app/processing/VertigoDataStore';
import { DataBlock } from 'src/app/processing/datablock';
import { SmoothedData } from 'src/app/processing/processes/smootheddata';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss']
})
export class ProcessorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  smooth(dataType: DataType){
    let store:VertigoDataStore = VertigoDataStoreManager.GetDataStore();
    let rawData: DataBlock = store.Get(dataType);
    let smoothedData: SmoothedData = new SmoothedData(rawData.Headers(),100);
    smoothedData.LoadAll(rawData.Data());
    let smoothedDataType = new DataType();
    smoothedDataType.from(dataType);
    smoothedDataType.Id = smoothedDataType.Id+".smoothed";
    smoothedDataType.Name = "Smoothed " + smoothedDataType.Name;
    store.Load(smoothedDataType, smoothedData);
  }

}
