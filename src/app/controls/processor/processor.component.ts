import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataType } from 'src/app/processing/datatype';
import { VertigoDataStoreManager } from 'src/app/processing/VertigoDataStoreManager';
import { VertigoDataStore } from 'src/app/processing/VertigoDataStore';
import { DataBlock } from 'src/app/processing/datablock';
import { SmoothedData } from 'src/app/processing/processes/smootheddata';
import { Column } from 'src/app/processing/column';
import { Dataspec } from 'src/app/processing/dataspec';
import { VertigoProcessedData, VertigoRawData } from 'src/app/processing/vertigo-data';
import { ProcessingMethod } from 'src/app/processing/processes/ProcessingMethod';
import { ProcessingMethods } from 'src/app/processing/processes/ProcessingMethods';
import { Param } from 'src/app/processing/processes/Param';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss']
})
export class ProcessorComponent implements OnInit {

  constructor() { }

  @Input() public VertigoRawData: VertigoRawData;
  @Output() loadedProcessedData = new EventEmitter<VertigoProcessedData>();
  @Output() loadingProgress = new EventEmitter<number>();
  public Dataspec: Dataspec = new Dataspec();
  public SelectedValue: any;
  public SelectedValue2: any;
  public SelectedValues: DataType[] = [];
  public ProcessingMethods: ProcessingMethod[] = ProcessingMethods.GetAllMethods();
  public SelectedProcessingMethod: ProcessingMethod;
  public Params: Param[];
  private ProcessedData:VertigoProcessedData=new VertigoProcessedData();

  ngOnInit() {
  }

  smooth(dataType: DataType) {
    const store: VertigoDataStore = VertigoDataStoreManager.GetDataStore();
    const rawData: DataBlock = store.Get(dataType);
    const smoothedData: SmoothedData = new SmoothedData();
    smoothedData.SetHeaders(rawData.Headers());
    smoothedData.SetParams([100]);
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
      const key: any = ( v as any).value.replace('\'', '').replace('\'', '').split(',');
      const group: DataType = this.Dataspec.Types.find(t => t.Id === key[0]);
      const newDataType: DataType = new DataType().from(group);
        DataTypes.push(newDataType);
    });
    this.SelectedValues = DataTypes;
  }

  public processingSelectionChanged(event: any) {

    let methodName:string = (Object.values(event).pop() as any).value;
    let method:ProcessingMethod = ProcessingMethods.GetAllMethods().find(v=>(v.Name==methodName));
    this.SelectedProcessingMethod = method;
    let params:Param[] =[];
    for (let i = 0; i < method.Params.length; i++){
      params.push(new Param(method.Params[i],method.DefaultParamValues[i]));
    }
    this.Params = params; 
    
  }

  public process(){
    console.log(this.Params);
    this.loadedProcessedData.emit(this.VertigoRawData);
    let method: DataBlock = this.SelectedProcessingMethod.ConstructDataBlock();
    let dataStore:VertigoDataStore = VertigoDataStoreManager.GetDataStore();
    this.SelectedValues.forEach(type=>{
      method.SetHeaders(type.Columns.map(c => c.Id as string));
      method.SetParams(this.Params.map(p=>p.Value));
      method.LoadAll(this.VertigoRawData.DataTypes.get(type.Identifier).Data())
      this.ProcessedData.DataTypes.set(type.Identifier,method);
      dataStore.Load(type,this.VertigoRawData.DataTypes.get(type.Identifier));
    });
    this.loadedProcessedData.emit(this.ProcessedData);
  }
}
