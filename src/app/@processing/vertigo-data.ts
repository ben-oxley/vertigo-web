import * as spec from "./vertigo-spec.json"
import { RawData } from "./processes/rawdata.js";
import { stringify } from "@angular/core/src/render3/util";

export class VertigoRawData{
    
    public DataTypes:Map<number,RawData>;

    public constructor(){
        this.DataTypes = new Map<number,RawData>();
    }
}