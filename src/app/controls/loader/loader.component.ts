import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RawData } from '../../processing/processes/rawdata';
import { DataBlock } from '../../processing/datablock';
import { Data } from '../../processing/data';
import { parse, ParseResult } from 'papaparse';
import * as vertigospec from '../../processing/vertigo-spec.json';
import { stringify } from '@angular/compiler/src/util';
import { VertigoProcessedData } from '../../processing/vertigo-data';
import { VertigoRawData } from "../../processing/vertigo-data";
import { AbstractDataBlock } from '../../processing/processes/abstractdatablock';
import { SmoothedData } from '../../processing/processes/smootheddata';
import Dexie from 'dexie';
import { DataDataBase } from '../../processing/DataDatabase';
import { VertigoDataStoreManager } from 'src/app/processing/VertigoDataStoreManager';
import { VertigoDataStore } from 'src/app/processing/VertigoDataStore';
import { Dataspec } from 'src/app/processing/dataspec';
import { DataType } from 'src/app/processing/datatype';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


  @Input() VertigoRawData: VertigoRawData;
  @Input() VertigoProcessedData: VertigoProcessedData;
  @Output() loaded = new EventEmitter<VertigoRawData>();
  @Output() loadedProcessedData = new EventEmitter<VertigoProcessedData>();
  @Output() loadingProgress = new EventEmitter<number>();
  public showtrim = false;

  vertigoPreviewData: VertigoRawData = null;

  constructor() {


  }

  ngOnInit() {
  }

  public triggerFile(inputField: Element) {
    this.workerReadFile((inputField as any).files[0]);
  }

  public toggleTrimControls(){
    this.showtrim = !this.showtrim;
  }

  public workerReadFile(fileName: Blob){
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./loader.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.loadingProgress.emit(data.progress);
        if (data.progress === 1.0 && data.data) {
          const rawDataClass: VertigoRawData = this.prepareRawDataClass();
          data.data.DataTypes.forEach((value, key) => {
            rawDataClass.DataTypes.set(key, RawData.Cast(value));
          });
          let store:VertigoDataStore = VertigoDataStoreManager.GetDataStore();
          let spec: Dataspec = new Dataspec();
          rawDataClass.DataTypes.forEach((v,k)=>{
            let type: DataType = spec.Types.find(t=>t.Identifier==k);
            store.Load(type, v);
          });
          this.vertigoPreviewData = rawDataClass;
          this.loaded.emit(rawDataClass);
        }
      };
      worker.postMessage(fileName);
    } else {
      this.asynchronousReadFile(fileName);
    }
  }

  public trim(event) {
    const rawDataClass: VertigoRawData = this.prepareRawDataClass();
    this.vertigoPreviewData.DataTypes.forEach((value, key) => {
            if (event.autorange) {
              rawDataClass.DataTypes.set(key, value);
            } else {
              const d: RawData = new RawData(value.Headers());
              d.LoadAll(value.Trim(event.xmin, event.xmax));
              rawDataClass.DataTypes.set(key, d);
            }
          });
    this.loaded.emit(rawDataClass);
  }

  private prepareRawDataClass(): VertigoRawData {
    const rawDataClass: VertigoRawData = new VertigoRawData();
    const types: any[] = (vertigospec as any).dataTypes;
    types.forEach(t => {
      const specIdentifier: number = t.identifier;
      const rawData: RawData = new RawData((t.columns as any[]).map(c => c.id as string));
      rawDataClass.DataTypes.set(specIdentifier, rawData);
    });
    return rawDataClass;
  }

  public asynchronousReadFile(inputField) {
    const fileName = inputField.files[0];
    if (!fileName) {
      alert('No file selected');
      return;
    }
    const reader = new FileReader();
    reader.onload = file => {
      const contents: any = file.target;
      const fileText: string = contents.result;
      console.log("Loaded file, starting parsing");
      const lines = fileText.split('\n');
      const numberOfLines: number = lines.length;
      let linesProcessed: number = 0;
      lines.forEach(line => {
        linesProcessed = linesProcessed + 1;
        const result: ParseResult = parse(line);
        this.loadingProgress.emit(linesProcessed / numberOfLines);
        if (result.data[0]) {
          if (!Number.isInteger(result.data[0][0])) {
            result.data[0][0] = Date.parse(result.data[0][0]);
          }
          const data: Data = new Data(result.data[0]);
          const identifier: number = +result.data[0][1];
          this.VertigoRawData.DataTypes.get(identifier).Load(data);
        }

      });
      this.loaded.emit(this.VertigoRawData);
      console.log('Finished loading file');
    };
    reader.readAsText(fileName);

  }

  public loadFile(fileForm, field, submitBtn) {
    var file = fileForm.files[0];
    if (!file) {
      alert("No file selected");
      return;
    }
    var reader = new FileReader();
    reader.onload = f => {
      var contents: any = f.target;
      var fileText: string = contents.result;
      field.value = fileText;
      submitBtn.disabled = false;
    };
    reader.readAsText(file);
  }



}
