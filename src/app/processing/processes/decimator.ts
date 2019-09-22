import { DataBlock } from "../datablock";
import { Data } from "../data";
import { DataListener } from "../listener";
import { AbstractDataBlock } from "./abstractdatablock";


export class Decimator extends AbstractDataBlock{

    private readonly frequency:number;
    private step:number = 0;

    public constructor(frequency:number){
        super();
        this.frequency = frequency;
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