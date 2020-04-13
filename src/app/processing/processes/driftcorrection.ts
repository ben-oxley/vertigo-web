import { DataBlock } from "../datablock";
import { Data } from "../data";
import { DataListener } from "../listener";
import { AbstractDataBlock } from "./abstractdatablock";


export class DriftCorrectedData extends AbstractDataBlock{


    public SetParams(params:number[]){
     
    }

    private add(data:Data){
        this.data.push(data);
    }

    private correct(){
        let firstTimestamp = this.data[0].Timestamp?this.data[0].Timestamp:this.data[0].Data[0];
        let sumY:number[] = this.data.map(d=>d.Data).reduce((total,value)=>this.addVectors(total,value));
        let sumX2:number = this.data.map(d=>(d.Timestamp?d.Timestamp-firstTimestamp:d.Data[0]-firstTimestamp)).reduce((t,v)=>t+(v*v));
        let sumX:number = this.data.map(d=>(d.Timestamp?d.Timestamp-firstTimestamp:d.Data[0]-firstTimestamp)).reduce((t,v)=>t+(v));
        let sumXY:number[] = this.data.map(d=>d.Data).reduce((total,value)=>this.addVectors(total,this.multiplyBy(value,value[0]-firstTimestamp)));
        let sumY2= this.data.map(d=>d.Data).reduce((total,value)=>this.addVectors(total,this.multiplyVectors(value,value)));
        let a:number[]=[];
        let b:number[]=[];
        for (let i = 2; i < this.data[0].Data.length; i++){
            let aCalc = ((sumY[i]*sumX2)-(sumX*sumXY[i]))/((this.data.length*sumX2)-(sumX*sumX))
            a.push(aCalc);
            let bCalc = ((this.data.length*sumXY[i])-(sumX*sumY[i]))/((this.data.length*sumX2)-(sumX*sumX));
            b.push(bCalc);
        }
        let newData:Data[] = [];
        for (let row = 0; row < this.data.length; row++){
            let d = new Data(this.data[row].Data);
            for (let i = 2; i < d.Data.length; i++){
                d.Data[i] = d.Data[i] - (a[i-2] + b[i-2]*(d.Data[0]-firstTimestamp));
            }
            newData.push(d);
        }
        this.data = newData;
        
    }

    private addVectors(a:number[],b:number[]):number[]{
        var result:number[] = []
        for(var i = 0; i < a.length; i++) {
            result.push( a[i] + b[i])
        }
        return result;
    }
    private multiplyVectors(a:number[],b:number[]):number[]{
        var result:number[] = []
        for(var i = 0; i < a.length; i++) {
            result.push( a[i] * b[i])
        }
        return result;
    }

    private multiplyBy(a:number[],b:number):number[]{
        var result:number[] = []
        for(var i = 0; i < a.length; i++) {
            result.push( a[i] * b)
        }
        return result;
    }

    

    public Load(data:Data){
        this.add(data);
        this.correct();
        this.notifyListeners([this.data[this.data.length-1]],[]);
    }

    public LoadAll(data:Data[]){
        data.forEach(d=>this.add(d));
        this.correct();
        this.notifyListeners(this.data.slice(this.data.length-data.length,this.data.length),[]);
    }



}