import { Component, OnInit } from '@angular/core';
import { DataType } from 'src/app/processing/datatype';
import { VertigoDataStoreManager } from 'src/app/processing/VertigoDataStoreManager';
import { VertigoDataStore } from 'src/app/processing/VertigoDataStore';
import { DataBlock } from 'src/app/processing/datablock';
import { SmoothedData } from 'src/app/processing/processes/smootheddata';
import { Column } from 'src/app/processing/column';
import { Dataspec } from 'src/app/processing/dataspec';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss']
})
export class ProcessorComponent implements OnInit {

  constructor() { }

  public Dataspec: Dataspec = new Dataspec();
  public SelectedValue: any;
  public SelectedValues: DataType[] = [];

  ngOnInit() {
  }

  smooth(dataType: DataType) {
    const store: VertigoDataStore = VertigoDataStoreManager.GetDataStore();
    const rawData: DataBlock = store.Get(dataType);
    const smoothedData: SmoothedData = new SmoothedData(rawData.Headers(), 100);
    smoothedData.LoadAll(rawData.Data());
    const smoothedDataType = new DataType();
    smoothedDataType.from(dataType);
    smoothedDataType.Id = smoothedDataType.Id + '.smoothed';
    smoothedDataType.Name = 'Smoothed ' + smoothedDataType.Name;
    store.Load(smoothedDataType, smoothedData);
  }

  public selectionChanged(event: any) {
    const DataTypes: DataType[] = [];
    Object.values(event).forEach(v => {
      const key: any = ( v as any).value.split(':')[1].trim().replace('\'', '').replace('\'', '').split(',');
      const group: DataType = this.Dataspec.Types.find(t => t.Id === key[0]);
      const col: Column = group.Columns.find(d => d.Id === key[1]);
      if (DataTypes.find(t => t.Id === key[0])) {
        DataTypes.find(t => t.Id === key[0]).Columns.push(col);
      } else {
        const newDataType: DataType = new DataType().from(group);
        newDataType.Columns = [];
        newDataType.Columns.push(col);
        DataTypes.push(newDataType);
      }
    });

  }

}
