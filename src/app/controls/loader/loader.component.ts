import { Component, OnInit } from '@angular/core';
import { RawData } from '../../@processing/processes/rawdata';
import { DataBlock } from '../../@processing/datablock';
import { FileParser } from './fileparser';
import { Data } from '../../@processing/data';
import {parse, ParseResult} from 'papaparse';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


  public DataBlock:DataBlock = new RawData();

  constructor() { }

  ngOnInit() {
  }

  public triggerFile(inputField:Element) {
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
        var fileText:string = contents.result;
        console.log("Loaded file");
        fileText.split('\n').forEach(line=>{
          let result:ParseResult = parse(line);
          let data:Data = new Data(result.data);
          this.DataBlock.Load(data);
        });
        console.log('Finished loading file');
      };
    reader.readAsText(fileName);
    
}

public loadFile(fileForm,field,submitBtn){
  var file = fileForm.files[0];
  if (!file) {
    alert("No file selected");
    return;
  }
  var reader = new FileReader();
  reader.onload = f => {
    var contents: any = f.target;
    var fileText:string = contents.result;
    field.value = fileText;
    submitBtn.disabled=false;
  };
  reader.readAsText(file);
}

  public loadFileURL(fileInput) {
    if (!fileInput) {
      alert("No file selected");
      return;
    }
    if (typeof fileInput != 'string'){
        fileInput = fileInput.File_Url;
    }
    ControlsComponent.Instance.setData(new CalculatedData());
    this.data = ControlsComponent.Instance.getData();
    var reader = new FileReader();
      this.http.get(fileInput)
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(file => {
        var fileText:string = file.text();
        console.log("Loaded file");
        let fp:FileParser = new FileParser();
        var callback:Function = (l)=>{
          this.data.loadData(l);
          ControlsComponent.Instance.dataChanged();
        }
        var stringLoader:Function = FileParser.parseLines(callback);
        fileText.split('\n').forEach(line=>{
          stringLoader(line+'\n');
        });
        console.log('Finished loading file');
      });
  }

}
