import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { FileParser } from '../shared/fileparser';
import { Data,CalculatedData, DataListener } from '../shared/data';
import { ControlsComponent } from "app/shared/controls.component";
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Component({
  templateUrl: 'loader.component.html'
})

@Injectable()
export class LoaderComponent implements OnInit {

  constructor (private http:Http){}

  public data:CalculatedData;

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';


  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

 

  public asynchronousReadFile(fileName) {
      if (!fileName) {
          alert("No file selected");
          return;
      }
      ControlsComponent.Instance.setData(new CalculatedData());
      this.data = ControlsComponent.Instance.getData();
      var reader = new FileReader();
      reader.onload = file => {
          var contents: any = file.target;
          var fileText:string = contents.result;
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

  public triggerFile(fileInput) {
    this.asynchronousReadFile(fileInput.files[0]);
  }

  public loadFileURL(fileInput) {
    if (!fileInput) {
      alert("No file selected");
      return;
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
  
  ngOnInit(): void {
    this.data = ControlsComponent.Instance.getData();
  
  }
}
