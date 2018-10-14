import { DataBlock } from "../datablock";
import { Data } from "../data";
import { DataListener } from "../listener";
import { AbstractDataBlock } from "./abstractdatablock";


export class SmoothedData extends AbstractDataBlock{

    public readonly bufferSize:number;
    private buffer:Data[] = [];
    private numberInBuffer:number = 0;
    private combinedValue:Data;

    public constructor(bufferSize:number){
        super();
        this.bufferSize = bufferSize;
    }

    private add(data:Data):Data{
        this.buffer.push(data);
        if (!this.combinedValue){
            this.combinedValue = new Data(data.Data);
        } else {
            this.combinedValue.AddData(data);
        }
        if (this.numberInBuffer===this.bufferSize){
            let removedData:Data = this.buffer.shift();
            this.combinedValue.SubtractData(removedData);
        } else {
            this.numberInBuffer++;
        }
        var smoothedData:Data = Data.Divide(this.combinedValue,this.numberInBuffer);
        this.data.push(smoothedData);
        return smoothedData;
    }

    public Load(data:Data){
        var smoothedData:Data = this.add(data);
        this.notifyListeners([smoothedData],[]);
    }

    public LoadAll(data:Data[]){
        var smoothedDataArray:Data[] = [];
        data.forEach(d => {
            var smoothedData:Data =this.add(d);
            smoothedDataArray.push(smoothedData);
        });
        this.notifyListeners(smoothedDataArray,[]);
    }

}