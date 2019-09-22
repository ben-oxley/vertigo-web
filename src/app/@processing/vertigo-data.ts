import { RawData } from "./processes/rawdata.js";


export class VertigoRawData{
    
    public DataTypes:Map<number,RawData>;

    public constructor(){
        this.DataTypes = new Map<number,RawData>();
    }
}