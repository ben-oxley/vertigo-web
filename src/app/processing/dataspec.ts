import * as spec from "./vertigo-spec.json"
import { DataType } from "./datatype";

export class Dataspec{
    
    

    public RawTypes:any[];
    public Types:DataType[];

    public constructor(){
        this.RawTypes = (<any>spec).dataTypes;
        this.Types = (<any[]>this.RawTypes).map(t=>new DataType().parse(t));
    }
}