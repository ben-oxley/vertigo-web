import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RawData } from '../../processing/processes/rawdata';
import { DataBlock } from '../../processing/datablock';
import { Data } from '../../processing/data';
import { parse, ParseResult } from 'papaparse';
import * as vertigospec from '../../processing/vertigo-spec.json';
import { stringify } from '@angular/compiler/src/util';
import { VertigoRawData, VertigoProcessedData } from '../../processing/vertigo-data';
import { AbstractDataBlock } from '../../processing/processes/abstractdatablock';
import { SmoothedData } from '../../processing/processes/smootheddata';
import Dexie from 'dexie';
import { DataDataBase } from '../../processing/DataDatabase';

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

  vertigoPreviewData: VertigoRawData = null;

  constructor() {


  }

  ngOnInit() {
  }

  public triggerFile(inputField: Element) {
    this.workerReadFile((inputField as any).files[0]);
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

  public asynchronousReadFile(inputField: Blob) {
    this.VertigoRawData = new VertigoRawData();
    this.VertigoProcessedData = new VertigoProcessedData();
    const types: any[] = (vertigospec as any).dataTypes;
    types.forEach(t => {
      const specIdentifier: number = t.identifier;
      const rawData: RawData = new RawData((<any[]>t.columns).map(c => <string>c.id));
      this.VertigoRawData.DataTypes.set(specIdentifier, rawData);
      const processedData: AbstractDataBlock = new SmoothedData((t.columns as any[]).map(c => c.id as string), 100);
      this.VertigoProcessedData.DataTypes.set(specIdentifier, processedData);
    });
    this.loaded.emit(this.VertigoRawData);
    this.loadedProcessedData.emit(this.VertigoProcessedData);
    var fileName = inputField;
    if (!fileName) {
      alert("No file selected");
      return;
    }
    var reader = new FileReader();
    reader.onload = file => {
      var contents: any = file.target;
      var fileText: string = contents.result;
      console.log("Loading file");
      if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
      }
      let db: DataDataBase = new DataDataBase();
      try{
        db.build();
      } catch{
        console.log('Raw data types table already existed.');
      }
      db.transaction('rw', db.data, async () => {
        fileText.split('\n').forEach(line => {
          let result: ParseResult = parse(line);
          if (result.data[0]) {
            if (!Number.isInteger(result.data[0][0])) {
              result.data[0][0] = Date.parse(result.data[0][0]);
            }

            let data: Data = new Data(result.data[0]);
            let identifier: number = +result.data[0][1];
            if (!db.storedData.where(["dataType", "processing"]).anyOf([identifier, 0])) {
              db.transaction('rw', db.storedData, async () => {
                for (let i = 2; i < result.data.length; i++) {
                  db.storedData.add({ column: i, dataType: identifier, processing: 0 });
                }
              }).catch(e => {
                alert(e.stack || e);
              });
            }

            // for (let i = 2; i < result.data[0].length; i++) {
            //   db.data.add({ timestamp: result.data[0][0], type: identifier, column: i, value: result.data[0][i] });
            // }

            this.VertigoRawData.DataTypes.get(identifier).Load(data);
            this.VertigoProcessedData.DataTypes.get(identifier).Load(data);
          }
          // let items:Data[] = [];
          // data.forEach(item => {
          //   for (let i = 2; i < item.data.length; i++) {
          //     items.push({ timestamp: item[0], type: item[1], column: i, value: result.data[0][i] });
          //   }
          // });
          
          // db.data.bulkAdd()

        });
      }).catch(e => {
        alert(e.stack || e);
      });

      this.loaded.emit(this.VertigoRawData);
      this.loadedProcessedData.emit(this.VertigoProcessedData);
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
