import { RawData } from "./processes/rawdata.js";
import { AbstractDataBlock } from "./processes/abstractdatablock.js";
import { DataType } from './datatype.js';
import { Dataspec } from './dataspec.js';

export class VertigoRawData {

    public DataTypes: Map<number, RawData>;

    public constructor() {
        this.DataTypes = new Map<number, RawData>();
    }

    public init(spec: Dataspec) {
        spec.Types.forEach(t => {
            this.DataTypes.set(t.Identifier, new RawData(t.Columns.map(c=>c.Name)));
        });
    }
}

export class VertigoProcessedData{

    public DataTypes: Map<number, AbstractDataBlock>;

    public constructor(){
        this.DataTypes = new Map<number, RawData>();
    }
}