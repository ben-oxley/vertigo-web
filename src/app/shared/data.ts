import { Point } from './point';
import { FileParser } from './fileparser';

export interface DataListener {
    DataUpdated(data:CalculatedData):void;
}

export interface DataPointListener {
    DataPointUpdated(index:number):void;
}

export class Data {
  constructor() { }
  public x:Point[] = [];
  public y:Point[] = [];
  public z:Point[] = [];
  public ax:Point[] = [];
  public ay:Point[] = [];
  public az:Point[] = [];
  public rx:Point[] = [];
  public ry:Point[] = [];
  public rz:Point[] = [];
  public q0:Point[] = [];
  public q1:Point[] = [];
  public q2:Point[] = [];
  public q3:Point[] = [];
  public newPositionData:boolean = false;
  public newIMUData:boolean = false;
  public newQuaternionData:boolean = false;

  public reset(){
      this.newPositionData = false;
      this.newIMUData = false;
      this.newQuaternionData = false;
  }
  
  public static parseLine(outputArray:Point[],line:Array<number>,type:number,channel:number):boolean{
        if (line[1]==type){
            outputArray.push(new Point(line[0]/1000.0,line[1+channel]));
            return true;
        }
        return false;
    }

    public loadData(data:any[]){
        for (var i = 0; i < data.length;i++){
            data[i] = parseFloat(data[i]);
        }
        this.newIMUData = Data.parseLine(this.ax,data,2,1);
        Data.parseLine(this.ay,data,2,2);
        Data.parseLine(this.az,data,2,3);
        Data.parseLine(this.rx,data,2,4);
        Data.parseLine(this.ry,data,2,5);
        Data.parseLine(this.rz,data,2,6);
        this.newPositionData = Data.parseLine(this.x,data,1,1);
        Data.parseLine(this.y,data,1,2);
        Data.parseLine(this.z,data,1,3);
        this.newQuaternionData = Data.parseLine(this.q0,data,3,1);
        Data.parseLine(this.q1,data,3,2);
        Data.parseLine(this.q2,data,3,3);
        Data.parseLine(this.q3,data,3,4);
    }
}

export class CalculatedData {
    constructor(){}
    public boardReference:Data = new Data();
    public integral:Data = new Data();
    public worldReference:Data = new Data();
    public loadData(data:any[]){
        this.boardReference.loadData(data);
        if (this.boardReference.newQuaternionData){
            if (this.boardReference.ax.length>0&&this.boardReference.rx.length>0){
                var xArr:Point[] = this.boardReference.ax;
                var ax:number = xArr[xArr.length-1].y;
                var yArr:Point[]  = this.boardReference.ay;
                var ay:number = yArr[yArr.length-1].y;
                var zArr:Point[]  = this.boardReference.az;
                var az:number = zArr[zArr.length-1].y;
                var rxArr:Point[] = this.boardReference.rx;
                var rx:number = rxArr[rxArr.length-1].y;
                var ryArr:Point[] = this.boardReference.ry;
                var ry:number = ryArr[ryArr.length-1].y;
                var rzArr:Point[] = this.boardReference.rz;
                var rz:number = rzArr[rzArr.length-1].y;
                var q0Arr:Point[] = this.boardReference.q0;
                var q0:number = q0Arr[q0Arr.length-1].y;
                var q1Arr:Point[] = this.boardReference.q1;
                var q1:number = q1Arr[q1Arr.length-1].y;
                var q2Arr:Point[] = this.boardReference.q2;
                var q2:number = q2Arr[q2Arr.length-1].y;
                var q3Arr:Point[] = this.boardReference.q3;
                var q3:number = q3Arr[q3Arr.length-1].y;
                var accelerationVector:Array<number> = [ax,ay,az];
                var angularAccelerationVector:Array<number> = [rx,ry,rz];
                var quaternion:Array<number> = [q0,q1,q2,q3];
                this.convertToWorldReference(q0Arr[q0Arr.length-1].x,accelerationVector,quaternion,[this.worldReference.ax,this.worldReference.ay,this.worldReference.az]);
                this.convertToWorldReference(q0Arr[q0Arr.length-1].x,angularAccelerationVector,quaternion,[this.worldReference.rx,this.worldReference.ry,this.worldReference.rz]);
                this.worldReference.newIMUData = true;
            }
        } else {
            this.worldReference.newIMUData = false;
        }
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

  private convertToWorldReference(time:number,vector:Array<number>,quaternion:Array<number>,output:Array<Point[]>){
      var correctedVector:Array<number> = this.toWorldReference(vector,quaternion);
      output[0].push(new Point(time,correctedVector[0]));
      output[1].push(new Point(time,correctedVector[1]));
      output[2].push(new Point(time,correctedVector[2]));
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
}
