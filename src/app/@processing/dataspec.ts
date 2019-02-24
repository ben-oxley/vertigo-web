import * as spec from "./vertigo-spec.json"

export class Dataspec{
    
    public Types:any;

    public constructor(){
        this.Types = (<any>spec).dataTypes;
    }
}