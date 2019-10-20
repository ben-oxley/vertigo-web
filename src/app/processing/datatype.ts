import { Column } from './column';

export class DataType {

    public RawType: any;
    public Columns: Column[];
    public Id: string;
    public Name: string;
    public Identifier: number;

    public parse(type: any): DataType {
        this.RawType = type;
        this.Id = type.id;
        this.Name = type.name;
        this.Identifier = type.identifier;
        this.Columns = ( type.columns as any[]).map(t => new Column(t));
        return this;
    }

    public from(clone: DataType): DataType {
        this.RawType = clone.RawType;
        this.Columns = clone.Columns.slice();
        this.Id = clone.Id;
        this.Name = clone.Name;
        this.Identifier = clone.Identifier;
        return this;
    }
}
