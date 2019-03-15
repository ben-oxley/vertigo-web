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


  @Input() VertigoRawData:VertigoRawData;
  @Output() loaded = new EventEmitter<VertigoRawData>();

  constructor() {
    this.VertigoRawData = new VertigoRawData();
    let types:any[] = (<any>vertigospec).dataTypes;
    types.forEach(t=>{
      let specIdentifier:number = t.identifier;
      let rawData:RawData = new RawData((<any[]>t.columns).map(c=><string>c.id));
      this.VertigoRawData.DataTypes.set(specIdentifier,rawData);
    });
      
  }

  ngOnInit() {
  }

  public triggerFile(inputField: Element) {
    this.asynchronousReadFile(inputField);
  }

  public asynchronousReadFile(inputField) {
    var fileName = inputField.files[0];
    if (!fileName) {
      alert("No file selected");
      return;
    }
    var reader = new FileReader();
    reader.onload = file => {
      var contents: any = file.target;
      var fileText: string = contents.result;
      console.log("Loaded file");
      fileText.split('\n').forEach(line => {
        let result: ParseResult = parse(line);
        if (result.data[0]){
          let data: Data = new Data(result.data[0]);
          let identifier:number = +result.data[0][1];
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
