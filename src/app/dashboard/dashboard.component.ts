import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { FileParser } from '../shared/fileparser';
import { CalculatedData } from '../shared/data';

@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  constructor(mainChart: ElementRef) { 
    this.mainChart = mainChart;
  }

  public mainChart : ElementRef;
  public data:CalculatedData;

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  // dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

  // mainChart
  private text: string;

  readSingleFile(inputField) {
      var fileName = inputField.files[0];
      if (!fileName) {
          alert("No file selected");
          return;
      }
      var reader = new FileReader();
      reader.onload = file => {
          var contents: any = file.target;
          this.text = contents.result;
          console.log("Loaded file");
          let fp:FileParser = new FileParser();
          var parsedFile = FileParser.parseFile(this.text);
          var ax:any = FileParser.parseArray(parsedFile,2,1);
          var ay:any = FileParser.parseArray(parsedFile,2,2);
          var az:any = FileParser.parseArray(parsedFile,2,3);
          var iax:any = this.integrate(ax);
          var iay:any = this.integrate(ay);
          var iaz:any = this.integrate(az);
          var rx:any = FileParser.parseArray(parsedFile,2,4);
          var ry:any = FileParser.parseArray(parsedFile,2,5);
          var rz:any = FileParser.parseArray(parsedFile,2,6);
          var x:any = FileParser.parseArray(parsedFile,1,1);
          var y:any = FileParser.parseArray(parsedFile,1,2);
          var z:any = FileParser.parseArray(parsedFile,1,3);
          var q0:any = FileParser.parseArray(parsedFile,3,1);
          var q1:any = FileParser.parseArray(parsedFile,3,2);
          var q2:any = FileParser.parseArray(parsedFile,3,3);
          var q3:any = FileParser.parseArray(parsedFile,3,4);
          var accelerationVector:Array<any> = [ax,ay,az];
          var angularAccelerationVector:Array<any> = [rx,ry,rz];
          var quaternion:Array<any> = [q0,q1,q2,q3];
          var correctedAcceleration:Array<any> = this.convertDataToWorldReference(accelerationVector,quaternion);
          var correctedAngularAcceleration:Array<any> = this.convertDataToWorldReference(angularAccelerationVector,quaternion);
          this.worldReferenceAccelerationChartData = [
            {
              data: correctedAcceleration[0],
              label: 'X'
            },
            {
              data: correctedAcceleration[1],
              label: 'Y'
            },
            {
              data: correctedAcceleration[2],
              label: 'Z'
            }
          ];
          this.worldReferenceAngularAccelerationChartData = [
            {
              data: correctedAngularAcceleration[0],
              label: 'X'
            },
            {
              data: correctedAngularAcceleration[1],
              label: 'Y'
            },
            {
              data: correctedAngularAcceleration[2],
              label: 'Z'
            }
          ];
          this.accelerationChartData = [
            {
              data: ax,
              label: 'X'
            },
            {
              data: ay,
              label: 'Y'
            },
            {
              data: az,
              label: 'Z'
            }
          ];
          this.accelerationIntegralChartData = [
            {
              data: iax,
              label: 'X'
            },
            {
              data: iay,
              label: 'Y'
            },
            {
              data: iaz,
              label: 'Z'
            }
          ];
          this.angularAccelerationChartData = [
            {
              data: rx,
              label: 'X'
            },
            {
              data: ry,
              label: 'Y'
            },
            {
              data: rz,
              label: 'Z'
            }
          ];
          this.worldReferenceAccelerationChartData = [
            {
              data: correctedAcceleration[0],
              label: 'X'
            },
            {
              data: correctedAcceleration[1],
              label: 'Y'
            },
            {
              data: correctedAcceleration[2],
              label: 'Z'
            }
          ];
          this.positionChartData = [
            {
              data: x,
              label: 'X'
            },
            {
              data: y,
              label: 'Y'
            },
            {
              data: z,
              label: 'Z'
            }
          ];
        };
      reader.readAsText(fileName);
  }

  asynchronousReadFile(inputField) {
      var fileName = inputField.files[0];
      if (!fileName) {
          alert("No file selected");
          return;
      }
      this.worldReferenceAccelerationChartData = this.create3DDataArray();
      this.accelerationChartData = this.create3DDataArray();
      this.accelerationIntegralChartData = this.create3DDataArray();
      this.angularAccelerationChartData = this.create3DDataArray();
      this.worldReferenceAngularAccelerationChartData = this.create3DDataArray();
      this.positionChartData = this.create3DDataArray();
      this.quaternionChartData = this.create4DDataArray();
      var reader = new FileReader();
      reader.onload = file => {
          var contents: any = file.target;
          var fileText:string = contents.result;
          console.log("Loaded file");
          let fp:FileParser = new FileParser();
          var callback:Function = (l)=>{
            for (var i = 0; i < l.length;i++){
              l[i] = parseFloat(l[i]);
            }
            FileParser.parseLine(this.accelerationChartData[0].data,l,2,1);
            FileParser.parseLine(this.accelerationChartData[1].data,l,2,2);
            FileParser.parseLine(this.accelerationChartData[2].data,l,2,3);
            this.accelerationChartData = this.accelerationChartData.slice();
            FileParser.parseLine(this.angularAccelerationChartData[0].data,l,2,4);
            FileParser.parseLine(this.angularAccelerationChartData[1].data,l,2,5);
            FileParser.parseLine(this.angularAccelerationChartData[2].data,l,2,6);
            this.angularAccelerationChartData = this.angularAccelerationChartData.slice();
            FileParser.parseLine(this.positionChartData[0].data,l,1,1);
            FileParser.parseLine(this.positionChartData[1].data,l,1,2);
            FileParser.parseLine(this.positionChartData[2].data,l,1,3);
            this.positionChartData = this.positionChartData.slice();
            FileParser.parseLine(this.quaternionChartData[0].data,l,3,1);
            FileParser.parseLine(this.quaternionChartData[1].data,l,3,2);
            FileParser.parseLine(this.quaternionChartData[2].data,l,3,3);
            FileParser.parseLineAnd(this.quaternionChartData[3].data,l,3,4,()=>{
              if (this.angularAccelerationChartData[0].data.length>0&&this.accelerationChartData[0].data.length>0){
                var xArr = this.accelerationChartData[0].data;
                var ax = xArr[xArr.length-1].y;
                var yArr = this.accelerationChartData[1].data;
                var ay = yArr[yArr.length-1].y;
                var zArr = this.accelerationChartData[2].data;
                var az = zArr[zArr.length-1].y;
                var rxArr = this.angularAccelerationChartData[0].data;
                var rx = rxArr[rxArr.length-1].y;
                var ryArr = this.angularAccelerationChartData[1].data;
                var ry = ryArr[ryArr.length-1].y;
                var rzArr = this.angularAccelerationChartData[2].data;
                var rz = rzArr[rzArr.length-1].y;
                var q0Arr = this.quaternionChartData[0].data;
                var q0 = q0Arr[q0Arr.length-1].y;
                var q1Arr = this.quaternionChartData[1].data;
                var q1 = q1Arr[q1Arr.length-1].y;
                var q2Arr = this.quaternionChartData[2].data;
                var q2 = q2Arr[q2Arr.length-1].y;
                var q3Arr = this.quaternionChartData[3].data;
                var q3 = q3Arr[q3Arr.length-1].y;
                var accelerationVector:Array<any> = [ax,ay,az];
                var angularAccelerationVector:Array<any> = [rx,ry,rz];
                var quaternion:Array<any> = [q0,q1,q2,q3];
                this.convertToWorldReference(q0Arr[q0Arr.length-1].x,accelerationVector,quaternion,this.worldReferenceAccelerationChartData);
                this.worldReferenceAccelerationChartData = this.worldReferenceAccelerationChartData.slice();
                this.convertToWorldReference(q0Arr[q0Arr.length-1].x,angularAccelerationVector,quaternion,this.worldReferenceAngularAccelerationChartData);
                this.worldReferenceAngularAccelerationChartData = this.worldReferenceAngularAccelerationChartData.slice();
            }
              //TODO - Slice is a hack that forces data re-rendering. However this can be extremely slow.
              //For now, we'll use it but we need to find a better way for chart.js to 
              //only render the changes rather than a full re-render. Look at the following for ideas
              //https://github.com/valor-software/ng2-charts/issues/291
              //This appears to be the fix:
              //https://github.com/valor-software/ng2-charts/pull/563
            this.quaternionChartData = this.quaternionChartData.slice();
              
            });
          }
          var stringLoader:Function = FileParser.parseLines(callback);
          fileText.split('\n').forEach(line=>{
            stringLoader(line+'\n');
          });
          // var fileArray:string[] = fileText.split('\n');
          // this.runSlowly((l)=>stringLoader(l+'\n'),fileArray,0);
          console.log('Finished loading file');
        };
      reader.readAsText(fileName);
      
  }



  asynchronousReadFile2(inputField) {
      var fileName = inputField.files[0];
      if (!fileName) {
          alert("No file selected");
          return;
      }
      this.worldReferenceAccelerationChartData = this.create3DDataArray();
      this.accelerationChartData = this.create3DDataArray();
      this.accelerationIntegralChartData = this.create3DDataArray();
      this.angularAccelerationChartData = this.create3DDataArray();
      this.worldReferenceAngularAccelerationChartData = this.create3DDataArray();
      this.positionChartData = this.create3DDataArray();
      this.quaternionChartData = this.create4DDataArray();
      var reader = new FileReader();
      reader.onload = file => {
          var contents: any = file.target;
          var fileText:string = contents.result;
          console.log("Loaded file");
          let fp:FileParser = new FileParser();
          var callback:Function = (l)=>{
            this.data.loadData(l);
            if (this.data.boardReference.newIMUData){
              this.accelerationChartData[0].data = this.data.boardReference.ax;
              this.accelerationChartData[1].data = this.data.boardReference.ay;
              this.accelerationChartData[2].data = this.data.boardReference.az;
              this.angularAccelerationChartData[0].data = this.data.boardReference.rx;
              this.angularAccelerationChartData[1].data = this.data.boardReference.ry;
              this.angularAccelerationChartData[2].data = this.data.boardReference.rz;
              this.accelerationChartData = this.accelerationChartData.slice();
              this.angularAccelerationChartData = this.angularAccelerationChartData.slice();
            }
            if (this.data.boardReference.newPositionData){
              this.positionChartData[0].data = this.data.boardReference.x;
              this.positionChartData[1].data = this.data.boardReference.y;
              this.positionChartData[2].data = this.data.boardReference.z;
              this.positionChartData = this.positionChartData.slice();
            }
            if (this.data.worldReference.newIMUData){
              this.worldReferenceAccelerationChartData[0].data = this.data.worldReference.ax;
              this.worldReferenceAccelerationChartData[1].data = this.data.worldReference.ay;
              this.worldReferenceAccelerationChartData[2].data = this.data.worldReference.az;
              this.worldReferenceAngularAccelerationChartData[0].data = this.data.worldReference.rx;
              this.worldReferenceAngularAccelerationChartData[1].data = this.data.worldReference.ry;
              this.worldReferenceAngularAccelerationChartData[2].data = this.data.worldReference.rz;
              this.worldReferenceAccelerationChartData = this.worldReferenceAccelerationChartData.slice();
              this.worldReferenceAngularAccelerationChartData = this.worldReferenceAngularAccelerationChartData.slice();
            }
           
              //TODO - Slice is a hack that forces data re-rendering. However this can be extremely slow.
              //For now, we'll use it but we need to find a better way for chart.js to 
              //only render the changes rather than a full re-render. Look at the following for ideas
              //https://github.com/valor-software/ng2-charts/issues/291
              //This appears to be the fix:
              //https://github.com/valor-software/ng2-charts/pull/563
          }
          var stringLoader:Function = FileParser.parseLines(callback);
          fileText.split('\n').forEach(line=>{
            stringLoader(line+'\n');
          });
          // var fileArray:string[] = fileText.split('\n');
          // this.runSlowly((l)=>stringLoader(l+'\n'),fileArray,0);
          console.log('Finished loading file');
        };
      reader.readAsText(fileName);
      
  }


  private runSlowly(callback:Function,filearray:string[],line){
      callback(filearray[line]);
      var ref = this;
      if (line<filearray.length-1){
          setTimeout(()=>ref.runSlowly(callback,filearray,line+1),10);
      }
  }

  private updateSets(datasets:any){
    datasets = datasets.slice();
  }

  private updateset(datasets:any):any{
    let newDataSets = [];
    datasets.forEach(dataset => {
      let newDataSet;
      let newData = dataset.data.slice();
        
      newDataSet = [{
        label: dataset.label,
        data: newData
      }];
      newDataSets.push(newDataSet);
    });
    return newDataSets;
  }

  private integrate(any:any):any{
    var lastX:number = any[0].x;
    var lastY:number = any[0].y;
    var output = [];
    var last:number = 0;
    any.forEach(element => {
      var diff:number = ((parseFloat(element.y)+lastY)*(parseFloat(element.x)-lastX)/2.0);
      if (isNaN(diff)){
        diff = 0;
      }
      output.push({x:element.x,y:last+diff});
      last = last+diff;
      lastX = parseFloat(element.x);
      lastY = parseFloat(element.y);
    });
    return output;
  }

  private convertToWorldReference(time:number,data:Array<any>,quaternion:Array<any>,output:Array<any>){
      var vector:Array<number> = [data[0],data[1],data[2]];
      var thisQuaternion:Array<number> = [quaternion[0],quaternion[1],quaternion[2],quaternion[3]];
      var correctedVector:Array<number> = this.toWorldReference(vector,thisQuaternion);
      output[0].data.push({x:time,y:correctedVector[0]});
      output[1].data.push({x:time,y:correctedVector[1]});
      output[2].data.push({x:time,y:correctedVector[2]});
  }

  private convertDataToWorldReference(data:Array<any>,quaternion:Array<any>):Array<any>{
    var output:Array<any> = [[],[],[]];
    var endIndex = data[0].length;
    if (quaternion[0].length< endIndex){
      endIndex = quaternion[0].length;
    }

    for (var i = 0; i < endIndex; i++){
      var vector:Array<number> = [parseFloat(data[0][i].y),parseFloat(data[1][i].y),parseFloat(data[2][i].y)];
      var thisQuaternion:Array<number> = [parseFloat(quaternion[0][i].y),parseFloat(quaternion[1][i].y),parseFloat(quaternion[2][i].y),parseFloat(quaternion[3][i].y)];
      var correctedVector:Array<number> = this.toWorldReference(vector,thisQuaternion);
      output[0].push({x:data[0][i].x,y:correctedVector[0]});
      output[1].push({x:data[0][i].x,y:correctedVector[1]});
      output[2].push({x:data[0][i].x,y:correctedVector[2]});
    }
    return output;
  }

  private toWorldReference(vector:Array<number>,quaternion:Array<number>):Array<number>{
    var outputVector:Array<number> = [0.0,vector[0],vector[1],vector[2]];
    outputVector = this.hamiltonian(quaternion,outputVector);
    outputVector = this.hamiltonian(outputVector,this.quaternionConjugate(quaternion));
    outputVector = [outputVector[1],outputVector[2],outputVector[3]];
    return outputVector;
  }

  private quaternionConjugate(q:Array<number>):Array<number>{
    var output:Array<number> = [];
    output.push( q[0]);
    output.push(-q[1]);
    output.push(-q[2]);
    output.push(-q[3]);
    return output;
  }

  private hamiltonian(q:Array<number>, r:Array<number>):Array<number>{
    var output:Array<number> = [];
    output.push(q[0]*r[0] - q[1]*r[1] - q[2]*r[2] - q[3]*r[3]);
    output.push(q[0]*r[1] + r[0]*q[1] + q[2]*r[3] - q[3]*r[2]);
    output.push(q[0]*r[2] + r[0]*q[2] + q[3]*r[1] - q[1]*r[3]);
    output.push(q[0]*r[3] + r[0]*q[3] + q[1]*r[2] - q[2]*r[1]);
    return output;
  }

  public triggerFile(fileInput:Element) {
    this.asynchronousReadFile(fileInput);
  }
  
  public worldReferenceAccelerationChartData: Array<any> = this.create3DDataArray();
  public accelerationChartData: Array<any> = this.create3DDataArray();
  public accelerationIntegralChartData: Array<any> = this.create3DDataArray();
  public angularAccelerationChartData: Array<any> = this.create3DDataArray();
  public worldReferenceAngularAccelerationChartData: Array<any> = this.create3DDataArray();
  public positionChartData: Array<any> = this.create3DDataArray();
  public quaternionChartData: Array<any> = this.create4DDataArray();

  public create1DDataArray():Array<any>{
    return [
    {
      data: [],
      label: 'Z'
    }
    ];
  }

  public create3DDataArray():Array<any>{
    return [
    {
      data: [],
      label: 'X'
    },
    {
      data: [],
      label: 'Y'
    },
    {
      data: [],
      label: 'Z'
    }
  ];
  }

  public create4DDataArray():Array<any>{
    return [
    {
      data: [],
      label: 'Q0'
    },
    {
      data: [],
      label: 'Q1'
    },
    {
      data: [],
      label: 'Q2'
    },
    {
      data: [],
      label: 'Q3'
    }
  ];
  }
 
  public mainChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public mainChartLegend = true;
  public mainChartType = 'scatter';

  ngOnInit(): void {

  }
}
