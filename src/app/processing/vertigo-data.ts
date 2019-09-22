import { RawData } from "./processes/rawdata.js";
import { AbstractDataBlock } from "./processes/abstractdatablock.js";

export class VertigoRawData{
    
    public DataTypes:Map<number,RawData>;

    public constructor(){
        this.DataTypes = new Map<number,RawData>();
    }
}

export class VertigoProcessedData{

    public DataTypes:Map<number,AbstractDataBlock>;

    public constructor(){
        this.DataTypes = new Map<number,RawData>();
    }
}