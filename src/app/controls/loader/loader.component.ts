import { Component, OnInit } from '@angular/core';
import { RawData } from '../../@processing/processes/rawdata';
import { DataBlock } from '../../@processing/datablock';
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



}
