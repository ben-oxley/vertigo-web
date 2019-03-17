export class Column{
    
    public RawType:any;
    public Id:string;
    public Name:string;
    public Units:string;
    public Identifier:number;

    public constructor(type:any){
        this.RawType = type;
        this.Id = type.id;
        this.Name = type.name;
        this.Units = type.Units;
        this.Identifier = type.identifier;
    }
}