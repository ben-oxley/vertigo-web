import { DataBlock } from "../datablock";
import { Data } from "../data";
import { DataListener } from "../listener";
import { AbstractDataBlock } from "./abstractdatablock";


export class DataIntegrator extends AbstractDataBlock{

    private currentTimeStep:number;
    private currentData:Data;

    public Load(data:Data){
        var integratedData:Data = this.load(data);
        this.notifyListeners([integratedData],[]);
    }

    private load(data:Data):Data{
        var integralStep:Data;
        if (this.currentData&&this.currentTimeStep){
            var step:number = (data.Timestamp - this.currentTimeStep)/1000.0;
            integralStep = Data.AddData(this.data[this.data.length-1],data)
            integralStep.Multiply(0.5*step);
            this.data.push(integralStep);
        } else {
            integralStep = new Data(Array.apply(null, Array(data.Data.length)).map(Number.prototype.valueOf,0))
        }
        this.currentData = new Data(data.Data);
        this.currentTimeStep = data.Timestamp;
        return integralStep;
    }

    public LoadAll(data:Data[]){
        var integratedDataArray:Data[] = [];
        data.forEach(d => {
            var integratedData:Data = this.load(d);
            integratedDataArray.push(integratedData);
        });
        this.notifyListeners(integratedDataArray,[]);
    }

}