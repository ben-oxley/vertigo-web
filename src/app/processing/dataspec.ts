import spec from "./vertigo-spec.json"
import { DataType } from "./datatype";

export class Dataspec{
    
    public static Spec: Dataspec = new Dataspec();

    public RawTypes:any[];
    public Types:DataType[];

    public constructor(){
        this.RawTypes = (<any>spec).dataTypes;
        this.Types = (<any[]>this.RawTypes).map(t=>new DataType().parse(t));
    }
}