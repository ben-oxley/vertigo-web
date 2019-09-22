import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RawData } from '../../@processing/processes/rawdata';
import { DataBlock } from '../../@processing/datablock';
import { Data } from '../../@processing/data';
import { parse, ParseResult } from 'papaparse';
import * as vertigospec from '../../@processing/vertigo-spec.json'
import { stringify } from '@angular/compiler/src/util';
import { VertigoRawData } from '../../@processing/vertigo-data';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


  @Input() VertigoRawData: VertigoRawData;
  @Output() loaded = new EventEmitter<VertigoRawData>();
  @Output() loadingProgress = new EventEmitter<Number>();

  constructor() {
    this.VertigoRawData = new VertigoRawData();
    const types: any[] = (<any>vertigospec).dataTypes;
    types.forEach(t => {
      const specIdentifier: number = t.identifier;
      const rawData: RawData = new RawData((<any[]>t.columns).map(c => <string>c.id));
      this.VertigoRawData.DataTypes.set(specIdentifier, rawData);
    });

  }

  ngOnInit() {
  }

  public triggerFile(inputField: Element) {
    this.asynchronousReadFile(inputField);
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
    const file = fileForm.files[0];
    if (!file) {
      alert("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onload = f => {
      const contents: any = f.target;
      const fileText: string = contents.result;
      field.value = fileText;
      submitBtn.disabled = false;
    };
    reader.readAsText(file);
  }



}
