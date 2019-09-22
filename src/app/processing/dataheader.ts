import * as spec from "./vertigo-spec.json"

export class DataHeader{
    public readonly type:string;
    public readonly identifier:number;
    public readonly columns:DataColumn[];
    public constructor(type:string,identifier:number,columns:DataColumn[]){
        this.type = type;
        this.identifier = identifier;
        this.columns = columns;
    }
}

export class DataColumn{
    public readonly name:string;
    public readonly units:string;
    public constructor(name:string,units:string){
        this.name = name;
        this.units = units;
    }
}

export class DataStructure{
    private readonly types;
    private readonly dataTypes:DataHeader[];

    public constructor(){
        this.types = (<any>spec).dataTypes;
        let datatypes:DataHeader[] = [];
        this.types.forEach(type => {
            let dataColumns:DataColumn[] = [];
            type.columns.forEach(col=>{
                dataColumns.push(new DataColumn(col.name,col.units));
            });
            datatypes.push(new DataHeader(type.name,type.identifier,dataColumns));
        });
        this.dataTypes = datatypes;
    }

    public getTypes():DataHeader[]{
        return this.dataTypes;
    }
}