import { DataBlock } from "../datablock";
import { Data } from "../data";
import { DataListener } from "../listener";
import { AbstractDataBlock } from "./abstractdatablock";


export class Decimator extends AbstractDataBlock{

    private frequency:number;
    private step:number = 0;

    public SetParams(params:number[]){
        this.frequency = params[0];
    }

    public Load(data:Data){
        if (this.step >= this.frequency-1){
            this.data.push(data);
            this.step = 0;
            this.notifyListeners([data],[]);
        }
        this.step++;
        
    }

    public LoadAll(data:Data[]){
        var updated:boolean = false;
        data.forEach(d => {
            if (this.step >= this.frequency-1){
                this.data.push(d);
                this.step = 0;
                updated = true;
            }
            this.step++;
        });
        if (updated) this.notifyListeners(data,[]);
        
    }

}