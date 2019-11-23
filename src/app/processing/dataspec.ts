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

    public static slice(type,start,take):DataType[]{
        const spec: Dataspec = new Dataspec();
        spec.Types[type].Columns = spec.Types[type].Columns.slice(start, start+take);
        spec.Types = [spec.Types[type]];
        return spec.Types;
    }
}