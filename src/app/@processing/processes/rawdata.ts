import { DataBlock } from "../datablock";
import { Data } from "../data";
import { DataListener } from "../listener";
import { AbstractDataBlock } from "./abstractdatablock";


export class RawData extends AbstractDataBlock{

    constructor(headers:string[]){
        super();
        this.headers = headers;
    }
    
    public Load(data:Data){
        this.data.push(data);
        this.notifyListeners([data],[]);
    }

    public LoadAll(data:Data[]){
        data.forEach(d => {
            this.data.push(d);
        });
        this.notifyListeners(data,[]);
    }

}